import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { ProfilePage } from '.';

describe('Profile page', () => {
  test('should render Profile Page', async () => {
    render(<ProfilePage />);
    const nameTag = await screen.findByText('First name');
    expect(nameTag).toBeInTheDocument();
  });
});
