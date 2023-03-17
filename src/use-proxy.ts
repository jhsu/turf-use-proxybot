import { ethers } from 'ethers'
import abi from './abi.json'

import { suspend } from 'suspend-react'

const proxyBotCheckerAddress = '0x50CdB28907a0522f5dD41f4A0c4b69afe7E4723b'

const globalCache = new Map()

const clear = (): void => globalCache.clear()

async function getVaultAddress(
  hotWalletAddress: string,
  signer?: ethers.ContractRunner,
  skipCache: boolean = false
): Promise<string | null> {
  const isAddress = ethers.isAddress(hotWalletAddress)
  if (!isAddress) return null

  if (!skipCache && globalCache.has(hotWalletAddress))
    return globalCache.get(hotWalletAddress)

  const proxyBot = new ethers.Contract(proxyBotCheckerAddress, abi, signer)
  const vaultAddress = await proxyBot.getVaultAddressForDelegate(
    hotWalletAddress
  )
  if (vaultAddress == '0x0000000000000000000000000000000000000000') {
    return null
  }

  globalCache.set(hotWalletAddress, vaultAddress)
  return vaultAddress
}

function useProxyBot(hotWalletAddress: string, signer?: ethers.ContractRunner) {
  const data = suspend(
    (address) => getVaultAddress(address, signer),
    [hotWalletAddress]
  )
  return data
}

export { useProxyBot, clear }
