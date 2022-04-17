import { createContext, useState } from "react";
import { Connector, MetamaskConnector } from "../connector";
import { Web3Interface } from "../types";

export const Web3Context = createContext<Web3Interface>({});

export const Web3Provider: React.FC<{
  children?: React.ReactNode;
  connector?: Connector;
}> = ({ children, connector = new MetamaskConnector() }) => {
  const [isLoading, setIsLoading] = useState(false);

  return <Web3Context.Provider value={{}}>{children}</Web3Context.Provider>;
};
