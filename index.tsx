import React from 'react'
import mitt, { Handler, Emitter } from 'mitt'

export const BusContext = React.createContext(null)

export function useBus () {
  return React.useContext(BusContext)
}

export function useListener (name: string, fn: Handler) {
  const bus = useBus()
  React.useEffect(() => {
    bus.on(name, fn)
    return () => {
      bus.off(name, fn)
    }
  }, [bus, name, fn])
}

export interface ProviderProps {
  emitter?: Emitter;
  children: any;
}

export function Provider (props: ProviderProps) {
  const emitter = props.emitter || mitt(); 
  const [bus] = React.useState(()=>emitter)
  const P = BusContext.Provider
  return <P value={bus}>{props.children}</P>
}
