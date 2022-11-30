const { ethers } = require('hardhat')

async function main() {
  const whitelistContract = await ethers.getContractFactory('whitelist')
  const deployedWhitelist = await whitelistContract.deploy(10)

  await deployedWhitelist.deployed()

  console.log(`Deployed to ${deployedWhitelist.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
