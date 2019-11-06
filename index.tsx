import React from "react";
import mitt from "mitt";

export function withBus(name = "bus") {
  return function decorate(BaseComponent) {
    const WithBus = props => (
      <ReactBusContext.Consumer>
        {emitter =>
          React.createElement(BaseComponent, {
            ...props,
            [name]: emitter
          })
        }
      </ReactBusContext.Consumer>
    );
    return WithBus;
  };
}

export const ReactBusContext = React.createContext(mitt());
