import React, {PropTypes} from 'react';
import DecoratorCreator from './DecoratorCreator';
import {CheckboxControl, SelectControl} from './controls';
import controllable from 'react-controllables';


class DefaultWrapper extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

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
    static propTypes = {
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
      children: PropTypes.array,
    }

    getLabel(value = this.props.value) {
      let children = this.props.children;
      if (!Array.isArray(children)) children = [children];

      if (children.length) {
        let child = children.find(({props: childProps} = {}) => (
          childProps && (childProps.value === value || childProps.value.toString() === value.toString())
        ));
        if (child && child.props.children) return child.props.children.toString();
      }

      return value != null ? value.toString() : null;
    }

    getChecked(value = this.props.value) {
      return !!value;
    }

    renderFacade() {
      // TODO: How to know which props go to facade?
      return (
        <Facade
          {...this.props}
          checked={this.getChecked()}
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
