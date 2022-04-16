import { ICoreOptions } from "web3modal";

export const defaultWeb3ModalOption = async (): Promise<
  Partial<ICoreOptions>
> => ({
  providerOptions: {},
  cacheProvider: true,
});
