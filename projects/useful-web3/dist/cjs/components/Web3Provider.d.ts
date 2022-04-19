/// <reference types="react" />
import { Connector } from "../connector";
import { Web3Interface } from "../types";
export declare const Web3Context: import("react").Context<Web3Interface>;
export declare const useWeb3: () => Web3Interface;
export declare const Web3Provider: React.FC<{
    children?: React.ReactNode;
    connector?: Connector;
}>;
