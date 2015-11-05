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

  @controllable(['value', 'focus'])
  class WrappedControl extends React.Component {
    static propTypes = {
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
      children: PropTypes.array,
      focus: PropTypes.bool,
      autoFocus: PropTypes.bool,
      onFocusChange: PropTypes.func,
      onFocus: PropTypes.func,
      onBlur: PropTypes.func,
    }

    static defaultProps = {
      focus: false,
      autoFocus: false,
    }

    componentDidMount() {
      if (this.props.autoFocus) this.props.onFocusChange(true);
    }

    getLabel(value = this.props.value) {
      let children = this.props.children;
      if (!Array.isArray(children)) children = [children];

      if (children.length) {
        let child = children.find(({props: childProps} = {}) => (
          childProps && (childProps.value === value || (value && childProps.value.toString() === value.toString()))
        ));
        if (child && child.props.children) return child.props.children.toString();
      }

      return value != null ? value.toString() : null;
    }

    getChecked(value = this.props.value) {
      return !!value;
    }

    handleFocus(event) {
      if (this.props.onFocus) this.props.onFocus(event);
      if (event.defaultPrevented) return;
      this.props.onFocusChange(true);
    }

    handleBlur(event) {
      if (this.props.onBlur) this.props.onBlur(event);
      if (event.defaultPrevented) return;
      this.props.onFocusChange(false);
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
      return (
        <Control
          {...this.props}
          onFocus={::this.handleFocus}
          onBlur={::this.handleBlur}
        />
      );
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
