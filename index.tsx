import React from "react";
import mitt from "mitt";

export function withBus(name = "bus") {
  return function decorate(BaseComponent) {
    const WithBus = props => (
      <ReactBusContext.Consumer>
        {context =>
          React.createElement(BaseComponent, {
            ...props,
            [name]: context.reactBus
          })
        }
      </ReactBusContext.Consumer>
    );
    return WithBus;
  };
}

export const ReactBusContext = React.createContext({
  reactBus: mitt()
});
