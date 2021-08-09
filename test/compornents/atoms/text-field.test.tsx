import React from 'react'
import { render } from '../../testUtils'
import TextField from '../../../components/atoms/text-field'
import { TextFieldType } from '../../../data'

describe('TextField components', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <TextField
        label={'test'}
        type={TextFieldType.Email}
        value={'defalut'}
        classes={['test1', 'test2']}
        error={false}
        onChange={() => console.log('hoge')}
      />,
      {}
    )
    expect(asFragment()).toMatchSnapshot()
  })

  // it('clicking button triggers alert', () => {
  //     const { getByText } = render(<Home />, {})
  //     window.alert = jest.fn()
  //     fireEvent.click(getByText('Test Button'))
  //     expect(window.alert).toHaveBeenCalledWith('With typescript and Jest')
  // })
})
