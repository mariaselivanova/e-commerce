import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import { LoginPage } from '.';

describe('LoginPage', () => {
  test('should display error message when email format is invalid', async () => {
    render(<LoginPage />);

    fireEvent.input(screen.getByRole('textbox', { name: /e\-mail/i }), {
      target: {
        value: 'email',
      },
    });

    const emailError = await screen.findByText('Please type an email of correct format (e.g. example@gmail.com)!');
    expect(emailError).toBeInTheDocument();
  });

  test('should display error message when password is short', async () => {
    render(<LoginPage />);

    fireEvent.input(screen.getByLabelText(/password/i), {
      target: {
        value: 'pass',
      },
    });

    const emailError = await screen.findByText('Password must be at least 8 characters long!');
    expect(emailError).toBeInTheDocument();
  });
});
