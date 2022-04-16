import React, { createContext } from "react";
import { Web3Interface } from "../types/web3Types";

export const Web3Context = createContext<Web3Interface>({});

export const Web3Provider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Web3Context.Provider value={{}}>{children}</Web3Context.Provider>
    </>
  );
};
