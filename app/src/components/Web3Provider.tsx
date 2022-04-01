import { defaultChains, getDefaultProviderOptions } from "@/util/config";
import React, { createContext, useEffect, useState } from "react";
import { Web3ContextInterface } from "../types/web3Types";
import {
  getAccountByIds,
  getChainId,
  getConnectedAccount,
  getWeb3Provider,
} from "../util/web3Util";

type Interface = Web3ContextInterface;

const getDefaultContextValue = (): Web3ContextInterface => ({
  provider: null,
  account: null,
  chainId: null,
  isLoading: true,
  isMetaMask: false,
  chains: defaultChains,
  connectWallet: async () => {
    /*初期化前用 */
  },
  switchChain: async () => {
    /*初期化前用 */
  },
});

export const Web3Context = createContext<Web3ContextInterface>(
  getDefaultContextValue()
);

export const Web3Provider: React.FC<React.PropsWithChildren<never>> = ({
  children,
}) => {
  const [provider, setProvider] = useState<Interface["provider"]>(null);
  const [account, setAccount] = useState<Interface["account"]>(null);
  const [chainId, setChainId] = useState<Interface["chainId"]>(null);
  const [isLoading, setIsLoading] = useState<Interface["isLoading"]>(false);
  const [isMetaMask, setIsMetaMask] = useState<Interface["isMetaMask"]>(false);

  const connectWallet = async () => {
    try {
      setIsLoading(true);
      const [instance, _provider] = await getWeb3Provider(
        await getDefaultProviderOptions()
      );
      setIsMetaMask(instance.isMetaMask);
      instance.on(
        "accountsChanged",
        (e: string[]) => void handleAccountsChanged(e)
      );
      instance.on("chainChanged", handleChainChanged);
      instance.on("disconnect", resetWeb3);
      localStorage.setItem("auto_connect", "yes");
      const accountPromise = async () =>
        setAccount(await getConnectedAccount(_provider));
      const providerPromise = async () => {
        const chainId = await getChainId(_provider);
        setChainId(chainId);
        setProvider(_provider);
      };
      await Promise.all([accountPromise(), providerPromise()]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const switchChain = async (chain: keyof typeof defaultChains) => {
    if (provider) {
      const param = defaultChains[chain];
      await provider.send("wallet_addEthereumChain", [param]);
      await provider.send("wallet_switchEthereumChain", [
        { chain: param.chainId },
      ]);
    }
  };

  const resetWeb3 = () => {
    setProvider(null);
    setAccount(null);
    setChainId(null);
  };

  const handleAccountsChanged = async (_accountIds: string[]) => {
    try {
      setIsLoading(true);
      setAccount(await getAccountByIds(_accountIds));
      !_accountIds.length && resetWeb3();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChainChanged = (_chainId: string) => setChainId(_chainId);

  useEffect(() => {
    localStorage.getItem("auto_connect") === "yes" && connectWallet();
    return resetWeb3;
  }, []);
  return (
    <Web3Context.Provider
      value={{
        provider,
        account,
        chainId,
        isLoading,
        isMetaMask,
        connectWallet,
        chains: defaultChains,
        switchChain,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
