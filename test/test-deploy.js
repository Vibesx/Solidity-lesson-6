const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage", function () {
	let simpleStorageFactory;
	let simpleStorage;
	beforeEach(async function () {
		simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
		simpleStorage = await simpleStorageFactory.deploy();
	});

	// first param is a name/description for the test; this can be used to run individual tests with "yarn hardhat test --grep <keyword>"; grep is similar to contains
	it("Should start with a favorite number of 0", async function () {
		const currentValue = await simpleStorage.retrieve();
		const expectedValue = "0";
		assert.equal(currentValue.toString(), expectedValue);
		// assert and expect do the same thing, but syntax differs
		//expect(currentValue.toString()).to.equal(expectedValue);
	});

	it("Should update when we call store", async function () {
		const expectedValue = "7";
		const transactionResponse = await simpleStorage.store(expectedValue);
		await transactionResponse.wait(1);

		const currentValue = await simpleStorage.retrieve();
		// currentValue is cast to String because it can be a very big number and that would cause problems if left as a number
		assert.equal(currentValue.toString(), expectedValue);
	});

	// it.only makes only these test cases run and others be ignored (unless --grep is used); multiple it.only tests may exist
	/* it.only("Only showcase test", async function () {
		assert.equal(1, 1);
	}); */
});
