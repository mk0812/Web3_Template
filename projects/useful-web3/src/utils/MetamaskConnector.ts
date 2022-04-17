import type detectEthereumProvider from "@metamask/detect-provider";
import { ChainParameter, Connector, EIP1193 } from "../types";
import { formatChainHex, invariant, parseChainId } from "./";

export class MetamaskConnector extends Connector {
  constructor(private options?: Parameters<typeof detectEthereumProvider>[0]) {
    super();
  }

  static getMetamask(opt: Parameters<typeof detectEthereumProvider>[0]) {
    return import("@metamask/detect-provider").then(({ default: detecter }) =>
      detecter(opt)
    ) as Promise<EIP1193 | undefined>;
  }

  private async prepareProvider() {
    this.provider = await MetamaskConnector.getMetamask(this.options);
  }

  static async switchTo(provider: EIP1193, chain: ChainParameter) {
    await provider.request({
      method: "wallet_addEthereumChain",
      params: [chain],
    });
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: formatChainHex(chain.chainId) }],
    });
  }

  async switchTo(chain: ChainParameter) {
    try {
    } catch (e) {
      this.dispatch;
    }
  }

  async connect() {
    try {
      this.provider || (await this.prepareProvider());
      invariant(this.provider, "Metamask not found");

      const [chainId, accounts] = (await Promise.all([
        this.provider.request({ method: "eth_chainId" }),
        this.provider.request({ method: "eth_requestAccounts" }),
      ])) as [string, string[]];
      this.dispatch("update", { chainId: parseChainId(chainId), accounts });
    } catch (e) {
      this.dispatch("error", e);
    }
  }
}
