## How it works

To navigate through the app, dispatch either `open` or `close`.


##### `open(Component, Props)`
open takes two params. First should be a component and the second is the props that should be passed down to the component.
This is a convenient function and the same as `push`

##### `close()`
close is simple, it just pops the latest route from navigation.routes reducer. close is just a better name for `pop`

##### `replace([ { component, props }], optional index)`
replace does what you think. It replaces the routes stack and shows the latest in routes, i.e the highest index in the array. You can also send an optional index as a second param.

##### `closeAndLeaveFirst()`
This one closes all open routes except for the first one. Convenient when you want to go back to ground zero.

##### `currentTab(int)`
Sets the active tab. Used in the Tabs component which often is the base component in the app.
