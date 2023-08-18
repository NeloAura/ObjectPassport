const hre = require("hardhat");

async function main() {
  // Get the PersonalDetails contract factory
  const PersonalDetails = await hre.ethers.getContractFactory("PersonalDetails");

  // Deploy the PersonalDetails contract
  const personalDetails = await PersonalDetails.deploy();

  // Wait for the deployment to complete
  await personalDetails.deployed();

  console.log("PersonalDetails Contract Deployed at:", personalDetails.address);

  // Get the ObjectPassport contract factory
  const ObjectPassport = await hre.ethers.getContractFactory("ObjectPassport");

  // Deploy the ObjectPassport contract and provide the address of the PersonalDetails contract
  const objectPassport = await ObjectPassport.deploy(personalDetails.address);

  // Wait for the deployment to complete
  await objectPassport.deployed();

  console.log("ObjectPassport Contract Deployed at:", objectPassport.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
  
});
