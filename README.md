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
var React = require('react');
var CFCheckbox = require('react-controlfacades').CFCheckbox;

var MyCustomCheckbox = React.createClass({
    displayName: 'MyCustomCheckbox',
    render: function () {
        // Render the checkbox facade using the CFCheckbox as a controller. For
        // the sake of simplicity, we're just using a function to generate the
        // facade here, however, you could also pass a component constructor.
        return (
            <CFCheckbox {...this.props} className="my-custom-checkbox" facade={ this.renderFacade } />
        );
    },
    renderFacade: function (props, children) {
        var style = {
            display: 'inline-block',
            width: '30px',
            height: '30px',
            border: '2px solid black',
            backgroundColor: props.checked ? 'black': 'white'
        };

        return (
            <div style={ style } />
        );
    }
});
```

The facade will recieve the following props:

<table>
    <tr>
        <td><code>checked</code></td>
        <td>For checkboxes, indicates whether the box is checked or not.</td>
    </tr>
    <tr>
        <td><code>value</code></td>
        <td>The value of the control.</td>
    </tr>
    <tr>
        <td><code>label</code></td>
        <td>
            For select boxes, the option string that corresponds to the selected
            value.
        </td>
    </tr>
</table>


[jquery.icbiacontrol]: https://github.com/matthewwithanm/jquery-icbiacontrol
