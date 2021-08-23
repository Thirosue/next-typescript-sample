import { NextApiRequest } from 'next'

export interface IdRequest extends NextApiRequest {
  query: {
    id: string | undefined
  }
}
