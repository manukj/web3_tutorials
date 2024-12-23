import hre from "hardhat";

async function main() {

    var AccountFactory = await hre.ethers.getContractFactory("AccountFactory");
    var EntryPoint = await hre.ethers.getContractFactory("EntryPoint");
    var Paymaster = await hre.ethers.getContractFactory("Paymaster");

    var accountFactory = await AccountFactory.deploy();
    var entryPoint = await EntryPoint.deploy();
    var paymaster = await Paymaster.deploy();

    console.log("AccountFactory deployed to:", await accountFactory.getAddress());
    console.log("EntryPoint deployed to:", await entryPoint.getAddress());
    console.log("Paymaster deployed to:", await paymaster.getAddress());

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });