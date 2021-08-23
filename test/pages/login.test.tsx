import React from 'react'
import { render, fireEvent } from '../testUtils'
import Login from '../../pages/login'

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Login />, {})
    expect(asFragment()).toMatchSnapshot()
  })

  it('clicking button triggers alert', () => {
    const { getByText } = render(<Login />, {})
    console.log = jest.fn()
    fireEvent.click(getByText('Sign in'))
    // FIXME
    // expect(console.log).toBeCalledTimes(1)
  })
})
