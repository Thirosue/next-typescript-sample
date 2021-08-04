import React from 'react'
import { render } from '../../testUtils'
import TextField from '../../../components/atoms/text-field'
import { TextFieldType } from '../../../data'

describe('TextField components', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<TextField label={'test'} type={TextFieldType.Email} defaultValue={'defalut'} classes={['test1', 'test2']} />, {})
    expect(asFragment()).toMatchSnapshot()
  })

  // it('clicking button triggers alert', () => {
  //     const { getByText } = render(<Home />, {})
  //     window.alert = jest.fn()
  //     fireEvent.click(getByText('Test Button'))
  //     expect(window.alert).toHaveBeenCalledWith('With typescript and Jest')
  // })
})