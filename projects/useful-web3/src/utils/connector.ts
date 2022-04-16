import detectEthereumProvider from "@metamask/detect-provider";
import { EIP1193 } from "../types/web3Types";

export const metamaskConnector = async (): Promise<EIP1193 | null> => {
  const eip1193 = ((await detectEthereumProvider()) || null) as EIP1193 | null;
  return eip1193;
};

export const web3modalConnector = async () => {};
