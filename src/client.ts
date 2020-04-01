import btoa from 'btoa-lite'
import { cloneDeepWith, isEqual, isObject } from 'lodash'

export interface AuthProps {
  tenantCode: string
  username: string
  password: string
}

export interface ConstructorOpts {
  log?: boolean
}

export interface Result<BodyType> {
  body: BodyType
}

export type FetchMethod = <BodyType>(path: string, init?: RequestInit) => Promise<Result<BodyType>>

export const createClient = ({ tenantCode, username, password }: AuthProps, opts?: ConstructorOpts) => {
  const authHeaderValue = `Basic ${btoa(`${username}:${password}`)}`

  return <FetchMethod>(async <BodyType>(path: string, init?: RequestInit): Promise<Result<BodyType>> => {
    const url = path.startsWith('http') ? path : `https://${tenantCode}.deposco.com/integration/${tenantCode}${path}`
    const method = init ? init.method || 'GET' : 'GET'
    const headers = {
      Authorization: authHeaderValue,
      Accept: 'application/json',
    }

    if (opts?.log) {
      console.log(`[${method}] ${url} ${init ? init.body : ''}`)
    }

    const res = await fetch(url, {
      headers,
      ...init,
    })

    // localize the response headers for processing
    const [contentTypeHeader] = ['content-type'].map(h => res.headers.get(h))

    // response body will almost always be JSON unless downtime
    const body = await (contentTypeHeader?.includes('application/json') ? res.json() : res.text())

    // check for errors
    if (res.status < 200 || res.status >= 300) throw new Error(body)

    const modifiedBody = cloneDeepWith(body, val => {
      if (isObject(val) && isEqual(val, { '@nil': 'true' })) return null
    })

    return {
      body: modifiedBody as BodyType,
    }
  })
}
