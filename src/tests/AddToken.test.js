import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import TokensProvider from '../context/TokensProvider';
import { act } from 'react-dom/test-utils';

const setToken = jest.fn();

const mockedContext = {
    token: {
      balance: 0,
      token: '',
    },
  };

describe('AddToken component...', () => {
    it('renders the title correctly', () => {
      renderWithRouter(<App />);

      const title = screen.getByRole('heading', { name: /wish wallet/i });

      expect(title).toBeInTheDocument();
  });
  it('takes back the user to home page when "return" is clicked', () => {
    renderWithRouter(<App />, '/add-token');

    const returnButton = screen.getByText(/return/i);

    userEvent.click(returnButton);

    const { location: { pathname } } = window;

    expect(pathname).toBe('/');
});
it('display an alert when one of the fields were left empty', () => {
    renderWithRouter(<App />, '/add-token');
    
    const tokenInput = screen.getByTestId('token-input');
    const balanceInput = screen.getByTestId('balance-input');
    const saveButton = screen.getByText(/save/i);

    userEvent.type(tokenInput, 'BTC');
    userEvent.type(balanceInput, '');
    userEvent.click(saveButton);

    expect(global.alert).toHaveBeenCalledWith('Make sure to fill all fields');

    userEvent.clear(tokenInput);
    userEvent.type(balanceInput, '0,0000000032');
    userEvent.click(saveButton);

    expect(global.alert).toHaveBeenCalledWith('Make sure to fill all fields');
});
it('displays an alert when a token already exists in the wallet', () => {
    const { history } = renderWithRouter(<App />, '/add-token');
    
    const tokenInput = screen.getByTestId('token-input');
    const balanceInput = screen.getByTestId('balance-input');
    const saveButton = screen.getByText(/save/i);

    userEvent.type(tokenInput, 'BTC');
    userEvent.type(balanceInput, '0,0000000032');
    userEvent.click(saveButton);

    history.push('/add-token');

    userEvent.type(tokenInput, 'BTC');
    userEvent.type(balanceInput, '0,0000000032');
    userEvent.click(saveButton);

    expect(global.alert).toHaveBeenCalledWith('Token already exists');
});
  it('changes the state from the components', () => {
    const { history } = renderWithRouter(
    <TokensProvider.Provider value={ mockedContext }>
        <App />
      </TokensProvider.Provider>
    );

    act(() => history.push('/add-token'));

    const tokenInput = screen.getByTestId('token-input');
    const balanceInput = screen.getByTestId('balance-input');
    const saveButton = screen.getByText(/save/i);
    
    userEvent.type(tokenInput, 'BTC');
    userEvent.type(balanceInput, '0,0000000032');
    userEvent.click(saveButton);

    act(() => {
        expect(setToken).toHaveBeenCalledWith({
            balance: '0,0000000032',
            token: 'BTC',
          });
    });
});
});
