import React, { useState } from 'react'
import { Button, Input } from '@web3uikit/core'
import { addr, abi } from '../utils/whitelist'
import { useContract, useSigner } from 'wagmi'

function VerifyWhitelist() {
  const [value, setValue] = useState()
  const { data: signer } = useSigner()

  const handleInput = (e) => {
    setValue(e.target.value)
    console.log(e.target.value)
  }

  const contract = useContract({
    address: addr,
    abi: abi,
    signerOrProvider: signer,
  })

  const isWhitelisted = async () => {
    try {
      const tx = await contract.isWhitelisted(value)
      alert(`${value} whitelisted: ${tx}`)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <Input
        type="text"
        placeholder="0x000"
        label="Wallet"
        onChange={handleInput}
        style={{ marginRight: '10px' }}
      />
      <Button
        type="button"
        text="Verify"
        theme="primary"
        onClick={isWhitelisted}
      ></Button>
    </>
  )
}

export default VerifyWhitelist
