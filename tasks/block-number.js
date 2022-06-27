const { task } = require("hardhat/config");

// 1st param is name, 2nd is description
task("block-number", "Prints the current block number").setAction(
	async (taskArgs, hre) => {
		const blockNumber = await hre.ethers.provider.getBlockNumber();
		console.log(`Current block number: ${blockNumber}`);
	}
);
