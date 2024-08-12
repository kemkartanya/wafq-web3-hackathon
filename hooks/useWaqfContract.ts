import { useState, useEffect } from 'react';
import { useContract, useSigner } from 'wagmi';
import WaqfABI from '../abi/WaqfABI.json';

const WAQF_CONTRACT_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';

export function useWaqfContract() {
  const { data: signer } = useSigner();
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  const waqfContract = useContract({
    address: WAQF_CONTRACT_ADDRESS,
    abi: WaqfABI,
    signerOrProvider: signer,
  });

  useEffect(() => {
    if (waqfContract) {
      setContract(waqfContract);
    }
  }, [waqfContract]);

  const createWaqf = async (name: string, beneficiary: string) => {
    if (!contract) return;
    try {
      const tx = await contract.createWaqf(name, beneficiary);
      await tx.wait();
      console.log('Waqf created successfully');
    } catch (error) {
      console.error('Error creating Waqf:', error);
    }
  };

  const donate = async (amount: string) => {
    if (!contract) return;
    try {
      const tx = await contract.donate({ value: ethers.utils.parseEther(amount) });
      await tx.wait();
      console.log('Donation successful');
    } catch (error) {
      console.error('Error donating:', error);
    }
  };

  return { createWaqf, donate };
}