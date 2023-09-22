import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { waitFor } from '@testing-library/react';

import { App } from '.';

describe('App', () => {
  test('displays a 404 page with incorrect route', async () => {
    const badRoute = '/badroute';
    await waitFor(() =>
      render(
        <MemoryRouter initialEntries={[badRoute]}>
          <App />
        </MemoryRouter>,
      ),
    );
    expect(screen.getByRole('heading', { name: /404/i })).toBeInTheDocument();
  });
});
