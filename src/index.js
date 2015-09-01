import React from 'react';
import DecoratorCreator from './DecoratorCreator';
import {CheckboxControl, SelectControl} from './controls';
import controllable from 'react-controllables';


class DefaultWrapper extends React.Component {
  render() {
    return (
      <span style={{display: 'inline-block', position: 'relative'}}>
        {this.props.children}
      </span>
    );
  }
}

export const facade = DecoratorCreator({wrapper: DefaultWrapper})(function(Facade, options) {
  const {wrapper: Wrapper, control: Control} = options || {};

  @controllable(['value'])
  class WrappedControl extends React.Component {
    render() {
      // TODO: How to know which props go to facade vs control?
      return (
        <Wrapper>
          <Facade {...this.props} />
          <Control {...this.props} />
        </Wrapper>
      );
    }
  }

  return WrappedControl;
});

export const checkbox = DecoratorCreator({control: CheckboxControl})(facade);
export const select = DecoratorCreator({control: SelectControl})(facade);
