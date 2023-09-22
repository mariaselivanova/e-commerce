import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { CartPage } from '.';

describe('Cart page', () => {
  test('should render Cart Page', async () => {
    render(
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>,
    );
    const cartTitle = await screen.findByText('Your Cart');
    expect(cartTitle).toBeInTheDocument();
  });
});
