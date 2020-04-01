namespace Deposco {
  export interface User {
    businessUnit?: string | null
    companyName?: string | null
    facility?: string | null
    organization: null
    username: string | null
    password?: string | null
    email?: string | null
    firstName?: string | null
    lastName?: string | null
    active?: string | null
    enabled?: string | null
    handheldMenu?: string | null
    title?: string | null
    employeeNumber?: string | null
    type?: string | null
    department?: string | null
    division?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    zip?: string | null
    timeZone?: string | null
    language?: string | null
    phone?: string | null
    mobile?: string | null
    fax?: string | null
  }

  export namespace Responses {
    export interface Users {
      user: User[]
    }
  }
}

export = Deposco
