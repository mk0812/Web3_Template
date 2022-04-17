export * from "./config";
export * from "./connector/MetamaskConnector";

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
