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
      type: 'checkbox'
    render: ControlFacadeMixin._render
    getControlProps: (props) ->
      if props.checked? then props
      else merge props, checkedLink: @linkState 'checked'
