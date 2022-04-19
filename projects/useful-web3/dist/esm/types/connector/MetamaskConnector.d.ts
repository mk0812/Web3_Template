import detectEthereumProvider from "@metamask/detect-provider";
import { ChainParameter, EIP1193 } from "../types";
import { Connector } from "./Connector";
export declare class MetamaskConnector extends Connector {
    private options?;
    constructor(options?: {
        mustBeMetaMask?: boolean | undefined;
        silent?: boolean | undefined;
        timeout?: number | undefined;
    } | undefined);
    static getMetamask(opt: Parameters<typeof detectEthereumProvider>[0]): Promise<EIP1193 | undefined>;
    private prepareProvider;
    switchChain(chain: ChainParameter): Promise<void>;
    connect(connectTo?: ChainParameter): Promise<void>;
}
