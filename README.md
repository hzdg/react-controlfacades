react-controlfacades
====================

This project gives you a way to easily customize control "facades"—what's
presented to a user—while keeping the native browser functionality. For example,
you can provide a custom component for displaying a `<select>`, but interacting
with it will trigger the browser's dropdown, wheel (iOS), or other
browser-appropriate view. It works by overlaying the original control with an
opacity of 0 on top of your custom component.

In effect, this package gives you controllers and allows you to provide your own
"dumb view" or "controlled" components for displaying state.

This is based on previous work on the [jquery.icbiacontrol] plugin.


Usage
-----

```jsx
import React from 'react';
import {checkbox} from 'react-controlfacades';

@checkbox()
class MyCheckbox extends React.Component {
  render() {
    const style = {
      display: 'inline-block',
      width: '30px',
      height: '30px',
      border: '2px solid black',
      backgroundColor: this.props.value ? 'black': 'white',
    };

    return (
      <div style={style}></div>
    );
  }
}
```

The facade will receive the following props:

name    | description
--------|------------
value   | The value of the control
label   | For select boxes, the option string that corresponds to the selected value.
checked | For check boxes, a boolean the corresponds to whether or not the box has been checked
focus   | Whether or not the control has focus

The wrapped facade will also accept some props for managing behavior:

name      | description
----------|------------
autoFocus | Whether or not to immediately focus the control on mount.
onFocus   | A callback for when the control receives focus. Receives the event as its only argument.
onBlur    | A callback for when the control loses focus. Receives the event as its only argument.

[jquery.icbiacontrol]: https://github.com/matthewwithanm/jquery-icbiacontrol
