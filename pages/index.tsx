import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";

const Contract = dynamic(() => import("./contract"), { ssr: false });

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>EthicalWaqf</title>
        <meta content="Template for development" name="description" />
        <link href="/favicon.png" rel="icon" />
      </Head>

      <main className={styles.main}>
        <h1>EthicalWaqf</h1>
        <h3>Empowering Ethical Giving, One Waqf at a Time</h3> <br/>
        <ConnectButton />
        <Contract />
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
