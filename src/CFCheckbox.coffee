React = require 'react'
LinkedStateMixin = require 'react/lib/LinkedStateMixin'
extend = require 'xtend'
ControlFacadeMixin = require './ControlFacadeMixin'

{input} = React.DOM


module.exports = me =
  React.createClass
    mixins: [LinkedStateMixin, ControlFacadeMixin]
    displayName: 'CFCheckbox'
    getDefaultProps: ->
      control: input
    getControlProps: (props) ->
      props = extend props
      props.type = 'checkbox'
      props.checkedLink = @linkState 'checked' unless @props.checked?
      props
    render: ControlFacadeMixin._render
