import "@/styles/global.css";
import { WalletConnectConnector, Web3Provider } from "@inaridiy/useful-web3";
import React from "react";

function MyApp({
  Component,
  pageProps,
}: {
  Component: React.FC;
  pageProps: any;
}) {
  return (
    <Web3Provider
      connector={
        new WalletConnectConnector({ rpc: { 137: "https://polygon-rpc.com/" } })
      }
    >
      <Component {...pageProps} />
    </Web3Provider>
  );
}

export default MyApp;
