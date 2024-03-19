import { useState, useEffect } from 'react'
import Web3 from 'web3'

type WalletResponse = {
  connectedStatus: boolean
  status: string
  address?: string
}

export function SmartWallet() {
  const [isConnected, setConnectedStatus] = useState(false)
  const [status, setStatus] = useState('')
  const [walletAddress, setWallet] = useState('')
  const [walletBalance, setWalletBalance] = useState('')

  useEffect(() => {
    if (isConnected && walletAddress) {
      getWalletBalance()
    }
  }, [isConnected, walletAddress])

  async function connectWalletPressed() {
    if (isConnected) {
      return alert(
        'Account already connected! ' +
          String(walletAddress).substring(0, 5) +
          '...' +
          String(walletAddress).substring(38),
      )
    }

    const walletResponse = await connectWallet()
    setConnectedStatus(walletResponse.connectedStatus)
    setStatus(walletResponse.status)
    setWallet(walletResponse.address || '')
  }

  async function connectWallet(): Promise<WalletResponse> {
    if (window.ethereum) {
      try {
        const address = await window.ethereum.enable()
        const obj: WalletResponse = {
          connectedStatus: true,
          status: 'Conectado',
          address: address[0], // Pode acessar o primeiro endereço retornado, se houver
        }
        return obj
      } catch (error) {
        return {
          connectedStatus: false,
          status: 'Error while connecting to account',
        }
      }
    } else {
      return {
        connectedStatus: false,
        status:
          'Install Metamask in your browser: https://metamask.io/download.html',
      }
    }
  }

  async function getWalletBalance() {
    if (window.ethereum) {
      // Provedor
      const web3 = new Web3(
        'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      )
      // Saldo na carteira
      const balance = await web3.eth.getBalance(walletAddress)
      setWalletBalance(web3.utils.fromWei(balance, 'ether'))
    }
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <span className="text-sm text-txt-00">Wallet Address</span>
        <span className="text-sm text-txt-00">{walletAddress}</span>
        <span className="text-sm text-txt-00">
          Wallet Balance: {walletBalance} ETH
        </span>
      </div>
      <button
        onClick={connectWalletPressed}
        className="flex items-center text-sm h-10 border-none bg-cl-light-success active:bg-cl-dark-success text-txt-00 rounded-lg p-3"
      >
        {status ? 'Wallet Connected' : 'Connect Wallet'}
      </button>
    </>
  )
}
