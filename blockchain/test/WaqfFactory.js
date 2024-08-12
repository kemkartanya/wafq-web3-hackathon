const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const hre = require("hardhat"); // Ensure this import is correct
const ethers = hre.ethers; // Correctly reference ethers

describe("WaqfFactory", function () {
  async function deployWaqfFactoryFixture() {
    const [deployer, user] = await ethers.getSigners();

    // Deploy the WaqfFactory contract
    const WaqfFactory = await ethers.getContractFactory("WaqfFactory");
    const waqfFactory = await WaqfFactory.deploy();

    return { waqfFactory, deployer, user };
  }

  describe("Deployment", function () {
    it("Should create a new Waqf contract", async function () {
      const { waqfFactory, user } = await loadFixture(deployWaqfFactoryFixture);

      // Create a new Waqf
      const createWaqfTx = await waqfFactory.createWaqf("Test Waqf", user.address);
      await createWaqfTx.wait();

      // Get the address of the newly created Waqf contract
      const waqfAddress = await waqfFactory.waqfs(0);
      expect(waqfAddress).to.not.equal(ethers.constants.AddressZero); // Fixed reference to AddressZero
    });

    it("Should allow donations and distribute funds", async function () {
      const { waqfFactory, deployer, user } = await loadFixture(deployWaqfFactoryFixture);

      // Create a new Waqf
      await waqfFactory.createWaqf("Test Waqf", user.address);

      // Get the address of the newly created Waqf contract
      const waqfAddress = await waqfFactory.waqfs(0);

      // Attach to the Waqf contract instance
      const Waqf = await ethers.getContractFactory("Waqf");
      const waqf = Waqf.attach(waqfAddress);

      // Donate to the Waqf
      await waqf.donate({ value: ethers.utils.parseEther("1") }); // Fixed reference to parseEther

      // Check the balance
      expect(await waqf.balance()).to.equal(ethers.utils.parseEther("1"));

      // Distribute the funds
      await waqf.distribute(ethers.utils.parseEther("1"));

      // Check the balance after distribution
      expect(await waqf.balance()).to.equal(0);

      // Check the beneficiary's balance (it should have increased)
      const beneficiaryBalance = await ethers.provider.getBalance(user.address);
      expect(beneficiaryBalance).to.be.gt(ethers.utils.parseEther("1"));
    });
  });
});
