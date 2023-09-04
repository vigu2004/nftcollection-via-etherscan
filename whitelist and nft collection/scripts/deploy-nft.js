const hre = require("hardhat");

const contractAddress = "0x5bf6add77a13297994cDc357952d2B4cfB8c398F";

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const nftContract = await hre.ethers.deployContract("CryptoDevs", [contractAddress]);

  await nftContract.waitForDeployment();

  console.log("NFT Contract Address:", nftContract.target);

  await sleep(30 * 1000); 

  await hre.run("verify:verify", {
    address: nftContract.target,
    constructorArguments: [contractAddress],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });