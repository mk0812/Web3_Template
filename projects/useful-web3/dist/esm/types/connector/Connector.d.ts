import { ChainParameter, ConnectorEvents, EIP1193 } from "../types";
export declare abstract class Connector {
    constructor();
    protected listeners: Map<keyof ConnectorEvents, ((...args: any[]) => void)[]>;
    provider: EIP1193 | undefined;
    abstract connect(connectTo?: ChainParameter): Promise<void>;
    abstract switchChain(chain: ChainParameter): Promise<void>;
    on<T extends keyof ConnectorEvents>(key: T, callback: (e: ConnectorEvents[T]) => void | Promise<void>): void;
    dispatch(key: keyof ConnectorEvents, event: ConnectorEvents[typeof key]): void;
}
