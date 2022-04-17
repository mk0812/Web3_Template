import type detectEthereumProvider from "@metamask/detect-provider";
import { ChainParameter, EIP1193 } from "../types";
import { formatChainHex, invariant, parseChainId } from "../utils";
import { Connector } from "./Connector";

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
    const provider = await MetamaskConnector.getMetamask(this.options);
    if (provider) {
      this.provider = provider;
      this.provider.on("disconnect", () => this.dispatch("disconnect"));
      this.provider.on("chainChanged", (chainId) =>
        this.dispatch("update", { chainId: parseChainId(chainId) })
      );
      this.provider.on("accountsChanged", (accounts) =>
        accounts.length === 0
          ? this.dispatch("disconnect")
          : this.dispatch("update", { accounts })
      );
    }
  }

  async switchChain(chain: ChainParameter) {
    try {
      invariant(this.provider, "Metamask not found");
      await this.provider
        .request({
          method: "wallet_addEthereumChain",
          params: [chain],
        })
        .then(() =>
          this.provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: formatChainHex(chain.chainId) }],
          })
        );
      invariant(this.provider, "Metamask not found");
    } catch (e) {
      this.dispatch("error", e);
    }
  }

  async connect(connectTo?: ChainParameter) {
    try {
      this.provider || (await this.prepareProvider());
      invariant(this.provider, "Metamask not found");
      const [chainId, accounts] = (await Promise.all([
        this.provider.request({ method: "eth_chainId" }),
        this.provider.request({ method: "eth_requestAccounts" }),
      ])) as [string, string[]];
      this.dispatch("update", { chainId: parseChainId(chainId), accounts });
      connectTo && (await this.switchChain(connectTo));
    } catch (e) {
      this.dispatch("error", e);
    }
  }
}
