React = require 'react'
merge = require 'react/lib/merge'

{PropTypes} = React
{div, span, input} = React.DOM


ControlFacadeMixin =
  propTypes:
    # Most of the props are simply forwarded to the wrapper. These two let you
    # give you more control over the input.
    control: PropTypes.func
    controlProps: PropTypes.object

    # This one lets you specify a component class to use for the wrapper.
    wrapper: PropTypes.func

    # This one is for the facade. It'll be passed props (checked, selected,
    # value) so you can render appropriately.
    facade: PropTypes.func
  getDefaultProps: ->
    wrapper: span
  getInitialState: -> {}
  _render: ->
    wrapperProps = merge @_getWrapperProps(),
      style: merge
        display: 'inline-block'
        position: 'relative'
        @props.style
    value = @props.value ? @state.value ? @props.defaultValue
    (@props.wrapper wrapperProps,
      (@props.facade
        checked: @props.checked ? @state.checked ? @props.defaultChecked
        selected: @props.selected ? @state.selected ? @props.defaultSelected
        value: value
        label: @getLabel value
      )
      (@props.control @_getControlProps(), @props.children)
    )
  getLabel: (value) ->
    if @props.children
      for child in @props.children
        if child.props.value is value
          return child.props.children?.toString()
  _getWrapperProps: ->
    props = merge @props
    delete props.controlProps
    delete props.checked
    delete props.defaultChecked
    delete props.selected
    delete props.defaultSelected
    delete props.value
    delete props.defaultValue
    props
  _getControlProps: ->
    props = merge @props.controlProps,
      checked: @props.checked
      defaultChecked: @props.defaultChecked
      selected: @props.selected
      defaultSelected: @props.defaultSelected
      value: @props.value
      defaultValue: @props.defaultValue

    props.style = merge props.style,
      display: 'block'
      position: 'absolute'
      opacity: '0'
      top: 0
      left: 0
      width: '100%'
      height: '100%'
      border: '1px solid #000' # Needed to make sure some browsers actually make the element 100% x 100%

    @getControlProps props


module.exports = ControlFacadeMixin
