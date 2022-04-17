import { ChainParameter, ConnectorEvents, EIP1193 } from "../types";

export abstract class Connector {
  constructor() {}
  protected listeners: Map<
    keyof ConnectorEvents,
    ((...args: unknown[]) => void)[]
  > = new Map();

  public provider: EIP1193 | undefined;
  abstract connect(connectTo?: ChainParameter): Promise<void>;
  abstract switchChain(chain: ChainParameter): Promise<void>;
  on(
    key: keyof ConnectorEvents,
    callback: (e: ConnectorEvents[typeof key]) => void | Promise<void>
  ): void {
    this.listeners.has(key)
      ? this.listeners.get(key).push(callback)
      : this.listeners.set(key, [callback]);
  }

  dispatch(
    key: keyof ConnectorEvents,
    event: ConnectorEvents[typeof key]
  ): void {
    this.listeners.has(key) &&
      this.listeners.get(key).forEach((cb) => cb(event));
  }
}
