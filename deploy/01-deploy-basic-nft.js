const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

require("dotenv").config()
// const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""
module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const arguments = []
    log("--------------------------------------")
    const basicNft = await deploy("BasicNft", {
        from: deployer,
        args: arguments,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,

    })
    log("deployed....")

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying......")
        await verify(basicNft.address, arguments);

    }
    log("---------------------------------------")
}

module.exports.tags = ["all", "Basic", "main"];