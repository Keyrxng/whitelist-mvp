import React, { useState } from 'react'
import { Button, Input } from '@web3uikit/core'
import { addr, abi } from '../utils/whitelist'
import { useContract, useSigner } from 'wagmi'

function AddWhitelist() {
  const [address, setAddress] = useState()
  const [value, setValue] = useState()
  const { data: signer } = useSigner()

  const contract = useContract({
    address: addr,
    abi: abi,
    signerOrProvider: signer,
  })

  const handleInput = (e) => {
    setValue(e.target.value)
    console.log(e.target.value)
  }

  const addToWhitelist = async () => {
    try {
      setAddress(value)
      const tx = await contract.addToWhitelist(value)
      await tx.wait()
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
        style={{ marginLeft: '10px' }}
      />
      <Button
        type="button"
        text="Verify"
        theme="primary"
        onClick={addToWhitelist}
      ></Button>
    </>
  )
}

export default AddWhitelist
