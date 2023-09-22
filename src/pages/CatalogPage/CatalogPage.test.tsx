import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { CatalogPage } from '.';

describe('Catalog page', () => {
  test('should render Catalog Page', async () => {
    render(
      <BrowserRouter>
        <CatalogPage />
      </BrowserRouter>,
    );
    const image = await screen.findByText('Filters');
    expect(image).toBeInTheDocument();
  });
});
