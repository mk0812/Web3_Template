import { useWeb3 } from "@inaridiy/useful-web3";
import type { NextPage } from "next";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { connectWallet, accounts, chainId, isLoading, error, disconnect } =
    useWeb3();
  console.log(accounts, chainId, isLoading, error?.message);
  useEffect(() => {}, []);
  return (
    <div className="w-full">
      {accounts.length === 0 ? (
        <button
          className="p-2 pl-5 pr-5 bg-blue-500 text-gray-100 text-lg rounded-lg"
          onClick={() => connectWallet()}
        >
          Connect
        </button>
      ) : (
        <button
          className="p-2 pl-5 pr-5 bg-blue-500 text-gray-100 text-lg rounded-lg"
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      )}
    </div>
  );
};

export default Home;
