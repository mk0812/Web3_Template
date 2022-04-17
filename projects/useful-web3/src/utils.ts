import { ICoreOptions } from "web3modal";

export const defaultChainList = {};

export const getDefaultWeb3ModalOption = async (): Promise<
  Partial<ICoreOptions>
> => ({
  providerOptions: {
    walletconnect: {
      package: (await import("@walletconnect/web3-provider")).default,
    },
  },
  cacheProvider: true,
});

export function invariant(value: unknown, message: string): asserts value {
  if (value) {
    return;
  } else {
    throw new Error(message);
  }
}

export const parseChainId = (chainId: string | number): number =>
  typeof chainId === "number" ? chainId : parseInt(chainId, 16);

export const formatChainHex = (chainId: number) => `0x${chainId.toString(16)}`;
