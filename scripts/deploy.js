async function main() {

  const [deployer] = await ethers.getSigners();

  console.log(
  "Deploying contracts with the account:",
  deployer.address
  );


  const Op = await ethers.getContractFactory("ObjectPassport");
  const contract = await Op.deploy();
  

  console.log("Contract deployed at:", contract.address);
}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error);
  process.exit(1);
});