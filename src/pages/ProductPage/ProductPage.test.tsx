import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { ProductPage } from '.';

describe('Product page', () => {
  test('should render Product Page', async () => {
    render(<ProductPage />);
    const image = await screen.findByRole('img');
    expect(image).toBeInTheDocument();
  });
});
