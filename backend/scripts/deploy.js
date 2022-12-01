const { ethers } = require('hardhat')
const { WHITELIST_CONTRACT_ADDRESS, METADATA_URL } = require('../constants')

async function main() {
  const whitelistContract = WHITELIST_CONTRACT_ADDRESS
  // URL from where we can extract the metadata for a Crypto Dev NFT
  const metadataURL = METADATA_URL

  const devsContract = await ethers.getContractFactory('CryptoDevs')
  const deployedDevs = await devsContract.deploy(metadataURL, whitelistContract)

  await deployedDevs.deployed()

  console.log(`Deployed to ${deployedDevs.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
