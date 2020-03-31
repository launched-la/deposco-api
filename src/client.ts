import btoa from 'btoa-lite'

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
    const url = path.startsWith('http') ? path : `https://api.deposco.com/integration/${tenantCode}${path}`
    const method = init ? init.method || 'GET' : 'GET'

    if (opts?.log) {
      console.log(`[${method}] ${url} ${init ? init.body : ''}`)
    }

    const res = await fetch(url, {
      headers: {
        Authorization: authHeaderValue,
        'Content-Type': 'application/json',
      },
      ...init,
    })

    // localize the response headers for processing
    const [contentTypeHeader] = ['content-type'].map(h => res.headers.get(h))

    // response body will almost always be JSON unless downtime
    const body = await (contentTypeHeader?.includes('application/json') ? res.json() : res.text())
    console.log(JSON.stringify(body))

    // check for errors
    if (res.status < 200 || res.status >= 300) throw new Error(body)

    return {
      body: body as BodyType,
    }
  })
}
