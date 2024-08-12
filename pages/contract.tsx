import { NextPage } from "next";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { abi, contractAddress } from "./abi/WaqfABI.json";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { formatEther, parseEther } from "viem";
import styles from "../styles/Home.module.css";

const Contract: NextPage = () => {
  const [donationAmount, setDonationAmount] = useState<string>("");
  const [debouncedDonationAmount] = useDebounce(donationAmount, 500);

  const [distributionAmount, setDistributionAmount] = useState<string>("");
  const [debouncedDistributionAmount] = useDebounce(distributionAmount, 500);

  // Read the contract's balance
  const { data: contractBalance } = useContractRead({
    address: `0x${contractAddress}`,
    abi: abi,
    functionName: "balance",
    watch: true,
  });

  // Prepare to donate to the Waqf
  const { config: donateConfig } = usePrepareContractWrite({
    address: `0x${contractAddress}`,
    abi: abi,
    functionName: "donate",
    value: debouncedDonationAmount
      ? parseEther(debouncedDonationAmount)
      : undefined,
  });

  // Prepare to distribute funds from the Waqf
  const { config: distributeConfig } = usePrepareContractWrite({
    address: `0x${contractAddress}`,
    abi: abi,
    functionName: "distribute",
    args: [
      debouncedDistributionAmount
        ? parseEther(debouncedDistributionAmount)
        : undefined,
    ],
  });

  const { data: donationResult, write: writeDonation } =
    useContractWrite(donateConfig);
  const { data: distributionResult, write: writeDistribution } =
    useContractWrite(distributeConfig);

  const { isLoading: isDonationLoading, isSuccess: isDonationSuccess } =
    useWaitForTransaction({
      hash: donationResult?.hash,
    });

  const { isLoading: isDistributionLoading, isSuccess: isDistributionSuccess } =
    useWaitForTransaction({
      hash: distributionResult?.hash,
    });

  return (
    <div>
      <h3>Contract Balance</h3>
      <p className={styles.description}>
        Balance:{" "}
        {contractBalance ? formatEther(contractBalance as bigint) : "0"} ETH
      </p>

      <h3>Donate to Waqf</h3>
      <input
        className={styles.input}
        placeholder="Amount in ETH"
        onChange={(e) => setDonationAmount(e.target.value)}
      />
      <button
        className={styles.button}
        disabled={!writeDonation || isDonationLoading}
        onClick={() => writeDonation?.()}
      >
        {isDonationLoading ? "Donating..." : "Donate"}
      </button>
      {isDonationSuccess && (
        <div>
          Successfully donated!
          <div>
            <a
              className={styles.card}
              href={`https://explorer.testedge2.haqq.network/tx/${donationResult?.hash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Link to explorer
            </a>
          </div>
        </div>
      )}

      <h3>Distribute Funds</h3>
      <input
        className={styles.input}
        placeholder="Amount in ETH"
        onChange={(e) => setDistributionAmount(e.target.value)}
      />
      <button
        className={styles.button}
        disabled={!writeDistribution || isDistributionLoading}
        onClick={() => writeDistribution?.()}
      >
        {isDistributionLoading ? "Distributing..." : "Distribute"}
      </button>
      {isDistributionSuccess && (
        <div>
          Successfully distributed!
          <div>
            <a
              className={styles.card}
              href={`https://explorer.testedge2.haqq.network/tx/${distributionResult?.hash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Link to explorer
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contract;
