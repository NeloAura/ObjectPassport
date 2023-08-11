const hre = require("hardhat");

async function main() {
  // Get the ObjectPassport contract factory
  const ObjectPassport = await hre.ethers.getContractFactory("ObjectPassport");

  // Deploy the contract
  const passport = await ObjectPassport.deploy();

  // Wait for the deployment to complete
  await passport.deployed();

  console.log("Contract Deployed at:", passport.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
