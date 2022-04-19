import { createContext, useContext, useEffect, useState } from "react";
import { Connector, MetamaskConnector } from "../connector";
import { ChainParameter, Web3Interface } from "../types";

export const Web3Context = createContext<Web3Interface>({
  isLoading: true,
  chainId: null,
  accounts: [],
  error: null,
  connector: null,
  connectWallet: async () => {},
  switchChain: async () => {},
  disconnect: async () => {},
});

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider: React.FC<{
  children?: React.ReactNode;
  connector?: Connector;
}> = ({ children, connector = new MetamaskConnector() }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [chainId, setChainId] = useState<null | number>(null);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const connectWallet = async (targetChain?: ChainParameter) => {
    setIsLoading(true);
    await connector.connect(targetChain);
    setIsLoading(false);
  };

  const switchChain = async (targetChain: ChainParameter) => {
    setIsLoading(true);
    await connector.switchChain(targetChain);
    setIsLoading(false);
  };

  const disconnect = async () => {
    setIsLoading(true);
    connector.disconnect && (await connector.disconnect());
    resetWeb3();
    setIsLoading(false);
  };

  const resetWeb3 = () => {
    setChainId(null);
    setAccounts([]);
    setError(null);
  };

  useEffect(() => {
    connector.on("update", ({ chainId, accounts }) => {
      chainId && setChainId(chainId);
      accounts?.length && setAccounts(accounts);
    });
    connector.on("error", (e) => setError(e || new Error(e)));
    connector.on("disconnect", resetWeb3);
  }, [connector]);

  return (
    <Web3Context.Provider
      value={{
        isLoading,
        chainId,
        accounts,
        error,
        connector,
        connectWallet,
        switchChain,
        disconnect,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
