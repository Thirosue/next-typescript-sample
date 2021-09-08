import { NextApiRequest } from 'next'

export type IdRequest = NextApiRequest & {
  query: {
    id: string | undefined
  }
}
