import type { IWalletConnectProviderOptions } from "@walletconnect/types";
import type WalletConnectProvider from "@walletconnect/web3-provider";
import { ChainParameter, EIP1193 } from "../types";
import { Connector } from "./Connector";
export declare class WalletConnectConnector extends Connector {
    private options;
    constructor(options?: IWalletConnectProviderOptions);
    provider: (EIP1193 & WalletConnectProvider) | undefined;
    static getWalletConnect(options: IWalletConnectProviderOptions): Promise<EIP1193 & WalletConnectProvider>;
    private prepareProvider;
    switchChain(chain: ChainParameter): Promise<void>;
    connect(connectTo?: ChainParameter): Promise<void>;
    disconnect(): Promise<void>;
}
