const hre = require("hardhat");
require("dotenv").config();

const ADDRESS = process.env.ADDRESS;

async function main() {
  const Waqf = await hre.ethers.getContractFactory("Waqf");

  console.log("Deploying Waqf...");
  const waqf = await Waqf.deploy("My First Waqf", ADDRESS);
  await waqf.deployed();

  console.log("Waqf deployed to:", waqf.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });