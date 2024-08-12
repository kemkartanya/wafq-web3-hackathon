import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Info from "./info";
import dynamic from "next/dynamic";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import CreateWaqf from '../components/CreateWaqf';
import Donate from '../components/Donate';

const Contract = dynamic(() => import("./contract"), { ssr: false });

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  return (
    <div className={styles.container}>
      <Head>
        <title>Haqq Network Dapp</title>
        <meta content="Template for development" name="description" />
        <link href="/favicon.png" rel="icon" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />
        <Contract />
        <Info />

        <div>
          <h1>Waqf Management System</h1>
          {isConnected ? (
            <>
              <p>Connected to {address}</p>
              <button onClick={() => disconnect()}>Disconnect</button>
              <h2>Create a New Waqf</h2>
              <CreateWaqf />
              <h2>Make a Donation</h2>
              <Donate />
            </>
          ) : (
            <button onClick={() => connect()}>Connect Wallet</button>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://haqq.network/"
          rel="noopener noreferrer"
          target="_blank"
        >
          HAQQ | Home of ethical web3
        </a>
      </footer>
    </div>
  );
};

export default Home;
