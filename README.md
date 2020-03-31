# Launched LA API

The goal of this repo is to be a super-simple, strongly-typed interface to the Deposco API.

## Usage

```
import createClient, { Errors, Deposco } from '@launchedla/deposco-api'

const api = createClient({
  tenantCode: 'whatever',
  username: 'user',
  password: 'password',
})

// tell the API what to expect in the result body
const result = await api<Deposco.SingleResult.PurchaseOrder>('/orders/Purchase Order')
```
