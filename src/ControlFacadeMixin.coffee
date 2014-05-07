React = require 'react'
merge = require 'react/lib/merge'

{PropTypes} = React
{div, span, input} = React.DOM


ControlFacadeMixin =
  propTypes:
    # Most of the props are simply forwarded to the control. These two let you
    # control the wrapper.
    wrapper: PropTypes.func
    wrapperProps: PropTypes.object

    # This one lets you specify a component class to use for the control.
    control: PropTypes.func

    # This one is for the facade. It'll be passed props (checked, selected,
    # value) so you can render appropriately.
    facade: PropTypes.func
  getDefaultProps: ->
    wrapper: span
  getInitialState: -> {}
  _render: ->
    wrapperProps = merge @props?.wrapperProps,
      style: merge @props?.wrapperProps?.style,
        display: 'inline-block'
        position: 'relative'
    (@props.wrapper wrapperProps,
      (@props.facade
        checked: @props.checked ? @state.checked ? @props.defaultChecked
        selected: @props.selected ? @state.selected ? @props.defaultSelected
        value: @props.value ? @state.value ? @props.defaultValue
      )
      (@props.control @_getControlProps(), @props.children)
    )
  _getControlProps: ->
    # Remove the wrapper-specific props.
    props = merge @props
    delete props.wrapper
    delete props.wrapperProps

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
