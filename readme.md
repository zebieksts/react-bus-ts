# react-bus-ts

[![npm](https://badgen.net/npm/v/react-bus-ts)](https://npmjs.com/package/react-bus-ts)

It is TypeScript flavour fork of react-bus package, which also has an improved API based on newer [React Context API](https://reactjs.org/docs/context.html).

A global event emitter for React apps.
Useful if you need some user interaction in one place trigger an action in another place on the page, such as scrolling a logging element when pressing PageUp/PageDown in an input element (without having to store scroll position in state).

## Usage

react-bus-ts contains a `<ReactBusContext />` context and a `withBus` decorator.

`<ReactBusContext.Provider value={mitt()} />` creates an event emitter and places it on the context.
`withBus()` takes the event emitter from context and passes it to the decorated component as the `bus` prop.

```js
import { ReactBusContext, withBus } from 'react-bus-ts'
import mitt from 'mitt';
// Inject `bus` prop to <Component />.
const ConnectedComponent = withBus()(Component)
const emitter=mitt();

<ReactBusContext.Provider value={emitter}>
  <ConnectedComponent />
</ReactBusContext.Provider>
```

For example, to communicate "horizontally" between otherwise unrelated components. Context provider is optional - it is used to provide custom emitter instance.


```js
import { ReactBusContext, withBus } from 'react-bus-ts'
const App = () => (
  <div>
    <ScrollBox />
    <Input />
  </div>
)
const ScrollBox = withBus()(class extends React.Component {
  onScroll = (top) => {
    this.el.scrollTop += top
  }
  componentDidMount () { this.props.bus.on('scroll', this.onScroll) }
  componentWillUnmount () { this.props.bus.off('scroll', this.onScroll) }
  render () {
    return <div ref={(el) => this.el = el}></div>
  }
})
// Scroll the ScrollBox when pageup/pagedown are pressed.
const Input = withBus()(({ bus }) => {
  return <input onKeyDown={onkeydown} />
  function onkeydown (event) {
    if (event.key === 'PageUp') bus.emit('scroll', -200)
    if (event.key === 'PageDown') bus.emit('scroll', +200)
  }
})
```

This may be easier to implement and understand than lifting the scroll state up into a global store.

## Install

```
npm install react-bus-ts
```

## API

### `<ReactBusContext.Provider value={emitter}>`

Create an event emitter that will be available to all deeply nested child elements using the `withBus()` function.

### `withBus(name='bus')(Component)`

Wrap `Component` and inject the event emitter as a prop named `name`.

## License

[MIT](./LICENSE)
