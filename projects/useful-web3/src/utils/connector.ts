import detectEthereumProvider from "@metamask/detect-provider";
import type { ICoreOptions } from "web3modal";
import { EIP1193 } from "../types/web3Types";
import { getDefaultWeb3ModalOption } from "./config";

export const metamaskConnector = async (): Promise<EIP1193 | null> => {
  const eip1193 = ((await detectEthereumProvider()) || null) as EIP1193 | null;
  return eip1193;
};

export const web3modalConnector = async (
  modalOptions?: Partial<ICoreOptions>
) => {
  modalOptions = modalOptions || (await getDefaultWeb3ModalOption());
  const Web3Modal = (await import("web3modal")).default;
  const web3Modal = new Web3Modal(modalOptions);
  const instance = (await web3Modal.connect()) as EIP1193;
  return instance;
};
