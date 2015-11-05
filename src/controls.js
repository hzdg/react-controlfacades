import React from 'react';


const {PropTypes} = React;

const controlStyles = {
  display: 'block',
  position: 'absolute',
  opacity: 0,
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  border: '1px solid #000', // Needed to make sure some browsers actually make the element 100% x 100%
};

/**
 * A wrapper for checkboxes that uses the expected control interface (`value`,
 * `defaultValue`, `onChange`).
 */
export class CheckboxControl extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.bool,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  }

  static defaultProps = {
    defaultValue: false,
  }

  handleChange(event) {
    if (this.props.onChange) this.props.onChange(!!event.currentTarget.checked);
  }

  handleFocus(event) {
    if (this.props.onFocus) this.props.onFocus(event);
  }

  handleBlur(event) {
    if (this.props.onBlur) this.props.onBlur(event);
  }

  render() {
    let props = Object.assign(this.props);
    delete props.checked;
    delete props.defaultChecked;

    return (
      <input
        defaultChecked={this.props.defaultValue}
        checked={this.props.value}
        style={controlStyles}
        {...this.props}
        type="checkbox"
        onChange={::this.handleChange}
        onFocus={::this.handleFocus}
        onBlur={::this.handleBlur}
      />
    );
  }
}

/**
 * A wrapper for `<select>`s that uses the expected control interface (`value`,
 * `defaultValue`, `onChange`).
 */
export class SelectControl extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  }

  handleChange(event) {
    if (this.props.onChange) this.props.onChange(event.currentTarget.value);
  }

  handleFocus(event) {
    if (this.props.onFocus) this.props.onFocus(event);
  }

  handleBlur(event) {
    if (this.props.onBlur) this.props.onBlur(event);
  }

  render() {
    return (
      <select
        style={controlStyles}
        {...this.props}
        onChange={::this.handleChange}
        onFocus={::this.handleFocus}
        onBlur={::this.handleBlur}
      >
        {this.props.children}
      </select>
    );
  }
}
