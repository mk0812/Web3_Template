import type { ethers } from "ethers";

export interface Web3Interface {}

export interface RequestArguments {
  readonly method: string;
  readonly params?: readonly unknown[] | object;
}

type EIP1193Events = {
  accountsChanged: (ids: string[]) => void;
  chainChanged: (chainId: string) => void;
  disconnect: () => void;
};

export interface EIP1193 extends ethers.providers.ExternalProvider {
  isMetaMask: boolean;
  on: <T extends keyof EIP1193Events>(
    event: T,
    callback: EIP1193Events[T]
  ) => void;
}

export type ConnectorEvents = {
  update: { accounts?: string[]; chainId?: number };
  disconnect: void;
  error: Error | undefined;
};

export interface ChainParameter {
  chainId: number;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[];
}
