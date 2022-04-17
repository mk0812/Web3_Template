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
