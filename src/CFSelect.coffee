React = require 'react'
LinkedStateMixin = require 'react/lib/LinkedStateMixin'
merge = require 'react/lib/merge'
ControlFacadeMixin = require './ControlFacadeMixin'

{select} = React.DOM


module.exports = me =
  React.createClass
    mixins: [LinkedStateMixin, ControlFacadeMixin]
    displayName: 'CFSelect'
    getDefaultProps: ->
      control: select
    getControlProps: (props) ->
      props = merge props
      props.valueLink = @linkState 'value' unless @props.value?
      props
    render: ControlFacadeMixin._render
