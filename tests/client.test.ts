import { api } from './_helpers'
import { Deposco } from '../src'

it('fetches users', async () => {
  try {
    const res = await api<Deposco.Responses.Users>('/users')
    expect(res.body.user.length).toBeGreaterThan(1)
  } catch (e) {
    fail(e)
  }
})
