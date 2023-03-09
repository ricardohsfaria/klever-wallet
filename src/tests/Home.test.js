import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Home componente...', () => {
    it('renders the title correctly', () => {
      renderWithRouter(<App />);
      const title = screen.getByRole('heading', { name: /wish wallet/i });
      expect(title).toBeInTheDocument();
  });
    it('redirects user to add token when button is clicked', () => {
        renderWithRouter(<App />);
        const button = screen.getByText(/add token/i);
        userEvent.click(button);
        const { location: { pathname } } = window;
        expect(pathname).toBe('/add-token');
    });
});

