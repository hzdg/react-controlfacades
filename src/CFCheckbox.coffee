React = require 'react'
LinkedStateMixin = require 'react/lib/LinkedStateMixin'
merge = require 'react/lib/merge'
ControlFacadeMixin = require './ControlFacadeMixin'

{input} = React.DOM


module.exports = me =
  React.createClass
    mixins: [LinkedStateMixin, ControlFacadeMixin]
    displayName: 'CFCheckbox'
    getDefaultProps: ->
      control: input
    getControlProps: (props) ->
      props = merge props
      props.type = 'checkbox'
      props.checkedLink = @linkState 'checked' unless @props.checked?
      props
    render: ControlFacadeMixin._render
