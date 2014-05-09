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
      control: input
    };
  },
  getControlProps: function(props) {
    props = merge(props);
    props.type = 'checkbox';
    if (this.props.checked == null) {
      props.checkedLink = this.linkState('checked');
    }
    return props;
  },
  render: ControlFacadeMixin._render
});

},{"./ControlFacadeMixin":3}],2:[function(_dereq_,module,exports){
var ControlFacadeMixin, LinkedStateMixin, React, me, merge, select;

React = (window.React);

LinkedStateMixin = (window.React.addons.LinkedStateMixin);

merge = (window.React.addons.merge);

ControlFacadeMixin = _dereq_('./ControlFacadeMixin');

select = React.DOM.select;

module.exports = me = React.createClass({
  mixins: [LinkedStateMixin, ControlFacadeMixin],
  displayName: 'CFSelect',
  getDefaultProps: function() {
    return {
      control: select
    };
  },
  getControlProps: function(props) {
    props = merge(props);
    if (this.props.value == null) {
      props.valueLink = this.linkState('value');
    }
    return props;
  },
  render: ControlFacadeMixin._render
});

},{"./ControlFacadeMixin":3}],3:[function(_dereq_,module,exports){
var ControlFacadeMixin, PropTypes, React, div, input, merge, span, _ref;

React = (window.React);

merge = (window.React.addons.merge);

PropTypes = React.PropTypes;

_ref = React.DOM, div = _ref.div, span = _ref.span, input = _ref.input;

ControlFacadeMixin = {
  propTypes: {
    control: PropTypes.func,
    controlProps: PropTypes.object,
    wrapper: PropTypes.func,
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
    var value, wrapperProps, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
    wrapperProps = merge(this._getWrapperProps(), {
      style: merge(this.props.style, {
        display: 'inline-block',
        position: 'relative'
      })
    });
    value = (_ref1 = (_ref2 = this.props.value) != null ? _ref2 : this.state.value) != null ? _ref1 : this.props.defaultValue;
    return this.props.wrapper(wrapperProps, this.props.facade({
      checked: (_ref3 = (_ref4 = this.props.checked) != null ? _ref4 : this.state.checked) != null ? _ref3 : this.props.defaultChecked,
      selected: (_ref5 = (_ref6 = this.props.selected) != null ? _ref6 : this.state.selected) != null ? _ref5 : this.props.defaultSelected,
      value: value,
      label: this.getLabel(value)
    }), this.props.control(this._getControlProps(), this.props.children));
  },
  getLabel: function(value) {
    var child, _i, _len, _ref1, _ref2;
    if (this.props.children) {
      _ref1 = this.props.children;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        child = _ref1[_i];
        if (child.props.value === value) {
          return (_ref2 = child.props.children) != null ? _ref2.toString() : void 0;
        }
      }
    }
  },
  _getWrapperProps: function() {
    var props;
    props = merge(this.props);
    delete props.controlProps;
    delete props.checked;
    delete props.defaultChecked;
    delete props.selected;
    delete props.defaultSelected;
    delete props.value;
    delete props.defaultValue;
    return props;
  },
  _getControlProps: function() {
    var props;
    props = merge(this.props.controlProps, {
      checked: this.props.checked,
      defaultChecked: this.props.defaultChecked,
      selected: this.props.selected,
      defaultSelected: this.props.defaultSelected,
      value: this.props.value,
      defaultValue: this.props.defaultValue
    });
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

},{}],4:[function(_dereq_,module,exports){
var CFCheckbox, CFSelect;

CFCheckbox = _dereq_('./CFCheckbox');

CFSelect = _dereq_('./CFSelect');

module.exports = {
  CFCheckbox: CFCheckbox,
  CFSelect: CFSelect
};

},{"./CFCheckbox":1,"./CFSelect":2}]},{},[4])
(4)
});