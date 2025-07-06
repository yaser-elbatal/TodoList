export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export interface OriginalDataItem {
  first_name: string
  last_name?: string
  username: string
  power: string
  gender: string
  birth_date: string
}

export interface TransformedDataItem {
  fullName: string
  username: string
  power: number
  birthDate: Date
}
