React = require 'react'
LinkedStateMixin = require 'react/lib/LinkedStateMixin'
extend = require 'xtend'
ControlFacadeMixin = require './ControlFacadeMixin'

{select} = React.DOM


module.exports = me =
  React.createClass
    mixins: [LinkedStateMixin, ControlFacadeMixin]
    displayName: 'CFSelect'
    getDefaultProps: ->
      control: select
    getControlProps: (props) ->
      props = extend props
      props.valueLink = @linkState 'value' unless @props.value?
      props
    render: ControlFacadeMixin._render
