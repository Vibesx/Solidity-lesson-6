const { ethers, run, network } = require("hardhat");

async function main() {
	const SimpleStorageFactory = await ethers.getContractFactory(
		"SimpleStorage"
	);
	console.log("Deploying contract...");
	const simpleStorage = await SimpleStorageFactory.deploy();
	await simpleStorage.deployed();
	console.log(`Deployed contract to: ${simpleStorage.address}`);
	// prints a lot of info about the network we are on
	// it's the same as running the script: yarn hardhat run scripts/deploy.js --network hardhat
	//console.log(network.config);

	// verify that the network is rinkeby
	console.log(`Network chainId: ${network.config.chainId}`);
	console.log(`Etherscan API key: ${process.env.ETHERSCAN_API_KEY}`);
	if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
		// we do this to make sure etherscan knows about the transaction deploy; even though the deploy finishes, it might take a second for etherscan to know about it, while the code doesn't explicitly wait for that second;
		// that is the reason why we .wait(x); (YAY FINALLY UNDERSTOOD THIS!)
		console.log("Waiting for block confirmations...");
		await simpleStorage.deployTransaction.wait(6);
		await verify(simpleStorage.address, []);
	}

	console.log("Retrieving current value...");
	const currentValue = await simpleStorage.retrieve();
	console.log(`Current Value is: ${currentValue}`);

	const transactionResponse = await simpleStorage.store(7);
	await transactionResponse.wait(1);
	const updatedValue = await simpleStorage.retrieve();
	console.log(`Updated value is: ${updatedValue}`);
}

// args are used when our contracts have constructors with parameters
// this verify method works on etherscan block exprorer; it might not work on other block explorers; for these they might have an api that we can use for that
// a block explorer is used to check transactions (see etherscan)
async function verify(contractAddress, args) {
	console.log("Verifying contract...");
	// this can fail if the contract is already verified so we add a try/catch
	try {
		// verify is the main task, second verify is a kind of subtask; there are multiple subtasks we can add here, more info on the github page of the etherscan plugin
		await run("verify:verify", {
			address: contractAddress,
			constructorArguments: args,
		});
	} catch (e) {
		if (e.message.toLowerCase().includes("already verified")) {
			console.log("Already Verified!");
		} else {
			console.log(e);
		}
	}
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
