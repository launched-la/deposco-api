import { api } from './_helpers'
import { Deposco } from '../src'

it('works', async () => {
  const res = await api<any>('/search/shipment')
  console.log(JSON.stringify(res))
})
