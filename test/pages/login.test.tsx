import React from 'react'
import { act } from 'react-dom/test-utils'
import { render, fireEvent } from '../testUtils'
import Login from '../../pages/login'
import axios from 'axios'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    }
  },
}))

const mock = () =>
  jest.fn().mockImplementation(() =>
    Promise.resolve({
      data: {},
    })
  )

describe('Login page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Login />, {})
    expect(asFragment()).toMatchSnapshot()
  })

  it('clicking button triggers sign in', async () => {
    const { getByText } = render(<Login />, {})
    axios.put = mock()
    await act(async () => {
      fireEvent.click(getByText('Sign in'))
    })
    expect(axios.put).toBeCalledTimes(1)
  })
})
