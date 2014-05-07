!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.controlfacades=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var ControlFacadeMixin, LinkedStateMixin, React, input, me, merge;

React = (window.React);

LinkedStateMixin = (window.React.addons.LinkedStateMixin);

merge = (window.React.addons.merge);

ControlFacadeMixin = _dereq_('./ControlFacadeMixin');

input = React.DOM.input;

module.exports = me = React.createClass({
  mixins: [LinkedStateMixin, ControlFacadeMixin],
  displayName: 'CFCheckbox',
  getDefaultProps: function() {
    return {
      control: input,
      type: 'checkbox'
    };
  },
  render: ControlFacadeMixin._render,
  getControlProps: function(props) {
    if (props.checked != null) {
      return props;
    } else {
      return merge(props, {
        checkedLink: this.linkState('checked')
      });
    }
  }
});

},{"./ControlFacadeMixin":2}],2:[function(_dereq_,module,exports){
var ControlFacadeMixin, PropTypes, React, div, input, merge, span, _ref;

React = (window.React);

merge = (window.React.addons.merge);

PropTypes = React.PropTypes;

_ref = React.DOM, div = _ref.div, span = _ref.span, input = _ref.input;

ControlFacadeMixin = {
  propTypes: {
    wrapper: PropTypes.func,
    wrapperProps: PropTypes.object,
    control: PropTypes.func,
    facade: PropTypes.func
  },
  getDefaultProps: function() {
    return {
      wrapper: span
    };
  },
  getInitialState: function() {
    return {};
  },
  _render: function() {
    var wrapperProps, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
    wrapperProps = merge((_ref1 = this.props) != null ? _ref1.wrapperProps : void 0, {
      style: merge((_ref2 = this.props) != null ? (_ref3 = _ref2.wrapperProps) != null ? _ref3.style : void 0 : void 0, {
        display: 'inline-block',
        position: 'relative'
      })
    });
    return this.props.wrapper(wrapperProps, this.props.facade({
      checked: (_ref4 = (_ref5 = this.props.checked) != null ? _ref5 : this.state.checked) != null ? _ref4 : this.props.defaultChecked,
      selected: (_ref6 = (_ref7 = this.props.selected) != null ? _ref7 : this.state.selected) != null ? _ref6 : this.props.defaultSelected,
      value: (_ref8 = (_ref9 = this.props.value) != null ? _ref9 : this.state.value) != null ? _ref8 : this.props.defaultValue
    }), this.props.control(this._getControlProps(), this.props.children));
  },
  _getControlProps: function() {
    var props;
    props = merge(this.props);
    delete props.wrapper;
    delete props.wrapperProps;
    props.style = merge(props.style, {
      display: 'block',
      position: 'absolute',
      opacity: '0',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      border: '1px solid #000'
    });
    return this.getControlProps(props);
  }
};

module.exports = ControlFacadeMixin;

},{}],3:[function(_dereq_,module,exports){
var CFCheckbox;

CFCheckbox = _dereq_('./CFCheckbox');

module.exports = {
  CFCheckbox: CFCheckbox
};

},{"./CFCheckbox":1}]},{},[3])
(3)
});