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

    getLabel(value = this.props.value) {
      if (this.props.children) {
        let child = this.props.children.find(child => child.props.value === value);
        if (child && child.props.children) return child.props.children.toString();
      }
      return value.toString();
    }

    renderFacade() {
      // TODO: How to know which props go to facade?
      return (
        <Facade
          {...this.props}
          label={this.getLabel()}
        />
      );
    }

    renderControl() {
      // TODO: How to know which props go to control?
      return <Control {...this.props} />;
    }

    render() {
      return (
        <Wrapper>
          {this.renderFacade()}
          {this.renderControl()}
        </Wrapper>
      );
    }
  }

  return WrappedControl;
});

export const checkbox = DecoratorCreator({control: CheckboxControl})(facade);
export const select = DecoratorCreator({control: SelectControl})(facade);
