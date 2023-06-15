const { getNamedAccounts, ethers, deployments, network } = require("hardhat")
const { assert } = require("chai")

const { developmentChains } = require("../../helper-hardhat-config")
!developmentChains.includes(network.name) ? describe.skip :
    describe("Basic NFT tests ", function () {
        let deployer, basicNft, accounts
        beforeEach(async () => {
            accounts = await ethers.getSigners()
            deployer = accounts[0]
            await deployments.fixture(["all"])
            basicNft = await ethers.getContract("BasicNFT")

        })
        it("Constructor of BasicNFT", async () => {
            assert.equal("0", (await basicNft.getTokenCounter()).toString())
        })
        it("Allows users to mint an NFT", async () => {
            const txResponse = await basicNft.MintNFT();
            await txResponse.wait(1);
            const TokenURI = await basicNft.tokenURI(0);
            assert.equal((await basicNft.getTokenCounter()).toString(), "1")
            assert.equal(TokenURI, (await basicNft.TOKEN_URI()))
        })
    }) 