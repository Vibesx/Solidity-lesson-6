require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("./tasks/block-number");
require("hardhat-gas-reporter");
require("solidity-coverage");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners();

	for (const account of accounts) {
		console.log(account.address);
	}
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

// set in .env file, taken from Alchemy -> Dashboard
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key";
const LOCALHOST_RPC_URL = process.env.LOCALHOST_RPC_URL || "";
const CMC_API_KEY = process.env.CMC_API_KEY || "key";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	defaultNetwork: "hardhat", //defines the default network that will be used; this can be overwritten in the command line (see Solidity course commands.txt)
	networks: {
		rinkeby: {
			url: RINKEBY_RPC_URL,
			accounts: [PRIVATE_KEY],
			chainId: 4,
		},
		localhost: {
			url: LOCALHOST_RPC_URL,
			// accounts: [],  // not needed, as the localhost will give us 10 accounts by default
			chainId: 31337,
		},
	},
	solidity: "0.8.8",
	etherscan: {
		apiKey: ETHERSCAN_API_KEY,
	},
	gasReporter: {
		enabled: true,
		outputFile: "gas-report.txt",
		noColors: true,
		currency: "EUR",
		coinmarketcap: CMC_API_KEY,
		token: "BNB",
	},
};
