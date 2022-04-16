import type { ethers } from "ethers";
export interface Web3Interface {
}
export interface RequestArguments {
    readonly method: string;
    readonly params?: readonly unknown[] | object;
}
declare type EIP1193Events = {
    accountsChanged: (ids: string[]) => void;
    chainChanged: (chainId: string) => void;
    disconnect: () => void;
};
export interface EIP1193 extends ethers.providers.ExternalProvider {
    isMetaMask: boolean;
    on: <T extends keyof EIP1193Events>(event: T, callback: EIP1193Events[T]) => void;
}
export {};
