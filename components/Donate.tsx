import React, { useState } from "react";
import { useWaqfContract } from "../hooks/useWaqfContract";

export default function Donate() {
  const [amount, setAmount] = useState("");
  const { donate } = useWaqfContract();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await donate(amount);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount to donate"
      />
      <button type="submit">Donate</button>
    </form>
  );
}
