import { Suspense, useMemo, useRef, useState } from 'react'
import './App.css'

import { useProxy } from 'turf-use-proxybot'
import { ethers } from 'ethers'
import React from 'react';

function Vault({ address }: { address: string}) {

	const provider = useMemo(() => new ethers.InfuraProvider('homestead', import.meta.env.VITE_INFURA_API_KEY), [])
  const vaultAddress = useProxy(address, provider)
  // const vaultAddress = 123

  return <div>
    <h1>Vault</h1>
    {address} &rarr; {vaultAddress ?? 'NONE'}
  </div>
}

function App() {
  const ref = useRef<HTMLInputElement>(null)
  const [address, setAddress] = useState("0x484eC62385e780f2460fEaC34864A77bA5A18134")

  return (
    <div className="App">
      <div>
        <input ref={ref} />
        <button onClick={() => {
          if (ref.current?.value) {
            setAddress(ref.current?.value)
          }
        }}>Check Proxy</button>
      </div>
      <h1>Vault Viewer</h1>
      <div className="card">
        <Suspense fallback={<div>Loading vault</div>}>
          <Vault address={address} />
        </Suspense>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
