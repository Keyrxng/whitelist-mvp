import styles from '../styles/Home.module.css'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Panel from '../components/panels'
import Section from '../layout/section'
import AddWhitelist from '../components/AddWhitelist'
import VerifyWhitelist from '../components/VerifyWhitelist'
import NumWhitelisted from '../components/NumWhitelisted'

export default function Home() {
  return (
    <div>
      <header className={styles.header_container}>
        <nav className={styles.navbar}>
          <a href="https://alchemy.com/?a=create-web3-dapp" target={'_blank'}>
            <img className={styles.alchemy_logo} src="/alchemy_logo.svg"></img>
          </a>
          <ConnectButton></ConnectButton>
        </nav>
        <div className={styles.logo_container}>
          <h1 className={styles.logo}>📝</h1>
          <h1>Address Whitelisting</h1>
          <a
            target={'_blank'}
            href="https://mumbai.polygonscan.com/address/0x516388D6C80736CbC86a8E7338fC6642Fa3F65AD"
            className={styles.docs_box}
          >
            View Contract On Mumbai-Scan
          </a>
        </div>
      </header>
      <main className={styles.main}>
        <Section>
          <div
            style={{
              display: 'flex',
              alignContent: 'space-between',
              justifyContent: 'space-around',
            }}
          >
            <Panel title="Verify Whitelist">
              <VerifyWhitelist />
            </Panel>
            <Panel title="Add To Whitelist">
              <AddWhitelist />
            </Panel>
          </div>
          <NumWhitelisted />
        </Section>
      </main>
    </div>
  )
}
