import React from 'react'
import { screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import renderWithRouter from '../helpers/renderWithRouter'

const ALL_FIELDS_ERROR = 'Make sure to fill all fields'
const TOKEN_EXISTS_ERROR = 'Token already exists'

describe('AddToken component...', () => {
  it('renders the title correctly', () => {
    renderWithRouter(<App />)

    const title = screen.getByRole('heading', { name: /wish wallet/i })

    expect(title).toBeInTheDocument()
  })
  it('takes back the user to home page when "return" is clicked', () => {
    renderWithRouter(<App />, '/add-token')

    const returnButton = screen.getByText(/return/i)

    userEvent.click(returnButton)

    const { location: { pathname } } = window

    expect(pathname).toBe('/')
  })
  it('display an alert when one of the fields were left empty', () => {
    jest.spyOn(global, 'alert').mockResolvedValue(
      { ALL_FIELDS_ERROR }
    )
    renderWithRouter(<App />, '/add-token')

    const tokenInput = screen.getByTestId('token-input')
    const balanceInput = screen.getByTestId('balance-input')
    const saveButton = screen.getByText(/save/i)

    userEvent.type(tokenInput, 'BTC')
    userEvent.type(balanceInput, '')
    userEvent.click(saveButton)

    expect(global.alert).toHaveBeenCalledWith(ALL_FIELDS_ERROR)

    userEvent.clear(tokenInput)
    userEvent.type(balanceInput, '0,0000000032')
    userEvent.click(saveButton)

    expect(global.alert).toHaveBeenCalledWith(ALL_FIELDS_ERROR)
  })
  it('displays an alert when a token already exists in the wallet', () => {
    jest.spyOn(global, 'alert').mockResolvedValue(
      { TOKEN_EXISTS_ERROR }
    )
    const { history } = renderWithRouter(<App />, '/add-token')

    const tokenInput = screen.getByTestId('token-input')
    const balanceInput = screen.getByTestId('balance-input')
    const saveButton = screen.getByText(/save/i)

    userEvent.type(tokenInput, 'BTC')
    userEvent.type(balanceInput, '0.0000000032')
    userEvent.click(saveButton)

    console.log(history.location.pathname)

    const { location: { pathname } } = window

    act(() => {
      history.push('/')
      expect(pathname).toBe('/')
    })

    act(() => {
      history.push('/add-token')
      expect(pathname).toBe('/add-token')
    })

    const tokenInputt = screen.getByTestId('token-input')
    const balanceInputt = screen.gteByTestId('balance-input')
    const saveButtont = screen.getByText(/save/i)

    userEvent.type(tokenInputt, 'BTC')
    userEvent.type(balanceInputt, '0.0000000032')
    userEvent.click(saveButtont)

    expect(global.alert).toHaveBeenCalledWith(TOKEN_EXISTS_ERROR)
  })
  it('adds a token', async () => {
    renderWithRouter(<App />, '/add-token')

    const tokenInput = screen.getByTestId('token-input')
    const balanceInput = screen.getByTestId('balance-input')
    const saveButton = screen.getByText(/save/i)

    userEvent.type(tokenInput, 'BTC')
    userEvent.type(balanceInput, '0.0000000032')
    userEvent.click(saveButton)

    const btc = screen.getByText(/btc/i)
    const balance = screen.getByText(/0.0000000032/i)

    act(() => {
      expect(btc).toHaveTextContent('BTC')
      expect(balance).toHaveTextContent('0.0000000032')
    })
  })
})
