import React, { useState } from "react";
import { useWaqfContract } from "../hooks/useWaqfContract";

export default function CreateWaqf() {
  const [name, setName] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const { createWaqf } = useWaqfContract();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createWaqf(name, beneficiary);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Waqf Name"
      />
      <input
        type="text"
        value={beneficiary}
        onChange={(e) => setBeneficiary(e.target.value)}
        placeholder="Beneficiary Address"
      />
      <button type="submit">Create Waqf</button>
    </form>
  );
}
