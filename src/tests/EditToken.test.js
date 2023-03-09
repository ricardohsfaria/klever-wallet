import React from 'react'
import { act, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import renderWithRouter from '../helpers/renderWithRouter'

const REMOVAL_WARNING = 'Are you sure you want to delete this token?'

const token = [{
  balance: 0.0000000032,
  token: 'BTC'
}]

describe('AddToken component...', () => {
  it.skip('edits a token correctly', () => {
    const { history } = renderWithRouter(<App />, '/edit-token/0')

    const tokenInput = screen.getByTestId('token-input')
    const balanceInput = screen.getByTestId('balance-input')
    const saveButton = screen.getByText(/save/i)

    userEvent.type(tokenInput, token.token)
    userEvent.type(balanceInput, token.balance)
    userEvent.click(saveButton)

    act(() => history.push('/'))

    const editIcon = screen.getByTestId('edit-icon')
    userEvent.click(editIcon)

    userEvent.clear(tokenInput)
    userEvent.type(tokenInput, 'BTC')
    userEvent.clear(balanceInput)
    userEvent.type(balanceInput, '0.0000000424')
    userEvent.click(saveButton)

    act(() => history.push('/'))

    const btc = screen.getByText(/btc/i)
    const balance = screen.getByText(/0.0000000424/i)

    act(() => {
      expect(btc).toHaveTextContent('BTC')
      expect(balance).toHaveTextContent('0.0000000424')
    })
  })
  it('takes back the user to home page when "return" is clicked', () => {
    renderWithRouter(<App />, '/add-token')

    const returnButton = screen.getByText(/return/i)

    userEvent.click(returnButton)

    const { location: { pathname } } = window

    expect(pathname).toBe('/')
  })
  it('displays an alert when remove button is clicked', () => {
    jest.spyOn(global, 'confirm').mockResolvedValue(
      { REMOVAL_WARNING }
    )
    renderWithRouter(<App />, '/edit-token/0')

    const removeButton = screen.getByText(/remove/i)

    userEvent.click(removeButton)

    expect(global.confirm).toHaveBeenCalledWith(REMOVAL_WARNING)
  })
})
