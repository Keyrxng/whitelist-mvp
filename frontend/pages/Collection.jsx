import React, { useEffect, useState } from 'react'
import { Button, Input, NftCard } from '@web3uikit/core'
import { nftAddr, nftAbi } from '../utils/whitelist'
import { useContractRead, useContract, useSigner } from 'wagmi'
import { utils } from 'ethers'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import { NftImage } from '../images/1.svg'

function Collection() {
  const [hasStarted, setStarted] = useState(false)
  const [hasEnded, setEnded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [tokenIdsMinted, setTokenIdsMinted] = useState('0')
  const { data: signer } = useSigner()

  const contract = useContract({
    address: nftAddr,
    abi: nftAbi,
    signerOrProvider: signer,
  })

  const presaleMint = async () => {
    try {
      const tx = await contract.presaleMint({ value: utils.parseEther('0.01') })
      setLoading(true)
      await tx.wait()
      setLoading(false)
      alert('Succesfully minted an NFT')
    } catch (err) {
      console.error(err)
    }
  }

  const publicMint = async () => {
    try {
      const tx = await contract.mint({ value: utils.parseEther('0.01') })
      setLoading(true)
      await tx.wait()
      setLoading(false)
      alert('Succesfully minted an NFT')
    } catch (err) {
      console.error(err)
    }
  }

  const startPresale = async () => {
    try {
      const tx = await contract.startPresale()
      setLoading(true)
      await tx.wait()
      setLoading(false)
      await hasPresaleStarted()
    } catch (err) {
      console.error(err)
    }
  }
  const presaleStarted = useContractRead({
    address: nftAddr,
    abi: nftAbi,
    functionName: 'presaleStarted',
  })
  const hasPresaleStarted = async () => {
    try {
      //   const presaleStarted = await contract.presaleStarted()
      if (!hasStarted) {
        await getOwner()
      }
      setStarted(presaleStarted)
      return presaleStarted
    } catch (err) {
      console.error(err)
      return false
    }
  }
  let presaleEnded = useContractRead({
    address: nftAddr,
    abi: nftAbi,
    functionName: 'presaleEnded',
  })

  const checkIfPresaleEnded = async () => {
    try {
      //   const presaleEnded = await contract.presaleEnded()
      const hasEnded = presaleEnded.data.lt(Math.floor(Date.now() / 1000))
      if (hasEnded) {
        setEnded(true)
      } else {
        setEnded(false)
      }
      return hasEnded
    } catch (err) {
      console.error(err)
      return false
    }
  }

  let owner = useContractRead({
    address: nftAddr,
    abi: nftAbi,
    functionName: 'owner',
  })

  const getOwner = async () => {
    try {
      //   const owner = await contract.owner()
      const user = signer
      const ownerr = owner.data
      console.log(owner.data)
      console.log('USER: ', user)
      if (user.toLowerCase() === ownerr.toLowerCase()) {
        setIsOwner(true)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const tokenIds = useContractRead({
    address: nftAddr,
    abi: nftAbi,
    functionName: 'tokenIds',
  })
  const getTokenIdsMinted = async () => {
    try {
      //   const tokenIds = await contract.tokenIds()
      setTokenIdsMinted(tokenIds.toString())
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getOwner()

    const presaleStarted = hasPresaleStarted()
    if (presaleStarted) {
      checkIfPresaleEnded()
    }

    getTokenIdsMinted()

    const presaleEndedInt = setInterval(async function () {
      const presaleStarted = await hasPresaleStarted()
      if (presaleStarted) {
        const presaleEnded = await checkIfPresaleEnded()
        if (presaleEnded) {
          clearInterval(presaleEndedInt)
        }
      }
    }, 5 * 1000)

    setInterval(async function () {
      await getTokenIdsMinted()
    }, 5 * 1000)
  }, [])

  const renderButton = () => {
    if (loading) {
      return <button className={styles.button}>Loading...</button>
    }

    if (!hasStarted) {
      return (
        <button className={styles.button} onClick={startPresale}>
          Start Presale!
        </button>
      )
    }

    if (!hasStarted) {
      return (
        <div>
          <div> Presale hasn't started! </div>{' '}
        </div>
      )
    }

    if (hasStarted && !hasEnded) {
      return (
        <div>
          <div>
            Presale has Started!! If your address is whitelisted, Mint a crypto
            Dev!
          </div>
          <button className={styles.button} onClick={presaleMint}>
            Presale Mint
          </button>
        </div>
      )
    }

    if (hasStarted && hasEnded) {
      return (
        <button className={styles.button} onClick={publicMint}>
          Public Mint
        </button>
      )
    }
  }

  return (
    <>
      <header className={styles.header_container}>
        <Navbar />
      </header>
      <main className={styles.main}>
        <div>
          <h1>Welcome to Crypto Devs!</h1>
          <div>It's an NFT collection for developers in Crypto</div>
          <div>{tokenIdsMinted}/20 have been minted</div>
          {renderButton()}
        </div>
        <div>
          <img className={styles.image} src={NftImage} />
        </div>

        <footer className={styles.footer}>
          Made with &#10084; by @Keyrxng
        </footer>
      </main>
    </>
  )
}
export default Collection
