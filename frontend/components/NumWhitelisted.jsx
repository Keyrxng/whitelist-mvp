import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Input } from '@web3uikit/core'
import styles from '../styles/Panel.module.css'
import { addr, abi } from '../utils/whitelist'
import { useContract, useSigner, useContractRead, useProvider } from 'wagmi'

function NumWhitelisted() {
  const [address, setAddress] = useState()
  const [wll, setWLL] = useState()
  const [twll, setTWLL] = useState()

  let whitelistLength = useContractRead({
    address: addr,
    abi: abi,
    functionName: 'getTotalWhitelisted',
  })

  let whitelistable = useContractRead({
    address: addr,
    abi: abi,
    functionName: 'getMaxWhitelistable',
  })

  useEffect(() => {
    setWLL(whitelistLength.data)
    setTWLL(whitelistable.data)
  }, [whitelistLength, whitelistable])

  return (
    <>
      <div className={styles.box}>
        <h1>Whitelist Statistics</h1>
        <div className={styles.button}>
          <h2>Wallets Whitelisted: {wll}</h2>
          <h2>Wallets Whitelistable: {twll}</h2>
          <h2>Spaces Available: {twll - wll}</h2>
        </div>
      </div>
    </>
  )
}

export default NumWhitelisted
