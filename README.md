# Turf Proxybot React hook

Use the amazing [ProxyBot](https://proxybot.turf.dev/) to delegate access to a vault.

## `useProxy(address, signer)`

Use this hook to get the associated valut of the `address`. Wrap with Suspense to show a fallback while loading.

```tsx
import ethers from 'ethers'
import { useProxy } from 'turf-use-proxybot'

const Vault = () => {
  const provider = ethers.getDefaultProvider()

  // Provide a signer/provider to call the contract
  const vaultAddress = useProxy(
    '0x9236e0ad628f4ee207ce050b44986af1ce19697f',
    provider
  )

  return <div>Vault address if present: {vaultAddress}</div>
}
```
