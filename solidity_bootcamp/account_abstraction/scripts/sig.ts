import hre from "hardhat";

async function main() {
    const [signer0] = await hre.ethers.getSigners();
    const sign = await signer0.signMessage(hre.ethers.getBytes(hre.ethers.id("hello")));
    var Test = await hre.ethers.getContractFactory("Test");

    var test = await Test.deploy(sign);
    console.log("address",await signer0.getAddress());

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });