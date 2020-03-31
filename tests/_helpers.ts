import createClient from '../src'

export const api = createClient(
  {
    tenantCode: process.env.TENANT_CODE as string,
    username: process.env.USERNAME as string,
    password: process.env.PASSWORD as string,
  },
  { log: true }
)
