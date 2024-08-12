const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Waqf", function () {
  let Waqf;
  let waqf;
  let owner;
  let beneficiary;
  let donor;

  beforeEach(async function () {
    [owner, beneficiary, donor] = await ethers.getSigners();

    Waqf = await ethers.getContractFactory("Waqf");
    waqf = await Waqf.deploy("Test Waqf", beneficiary.address);
    await waqf.deployed();
  });

  it("Should set the right founder", async function () {
    expect(await waqf.founder()).to.equal(owner.address);
  });

  it("Should set the right beneficiary", async function () {
    expect(await waqf.beneficiary()).to.equal(beneficiary.address);
  });

  it("Should allow donations", async function () {
    const donationAmount = ethers.utils.parseEther("1");
    await waqf.connect(donor).donate({ value: donationAmount });
    expect(await waqf.balance()).to.equal(donationAmount);
  });

  it("Should allow the founder to distribute funds", async function () {
    const donationAmount = ethers.utils.parseEther("1");
    await waqf.connect(donor).donate({ value: donationAmount });

    const distributionAmount = ethers.utils.parseEther("0.5");
    await waqf.connect(owner).distribute(distributionAmount);

    expect(await waqf.balance()).to.equal(
      donationAmount.sub(distributionAmount)
    );
  });

  it("Should not allow non-founders to distribute funds", async function () {
    const donationAmount = ethers.utils.parseEther("1");
    await waqf.connect(donor).donate({ value: donationAmount });

    const distributionAmount = ethers.utils.parseEther("0.5");
    await expect(
      waqf.connect(donor).distribute(distributionAmount)
    ).to.be.revertedWith("Only founder can distribute");
  });
});