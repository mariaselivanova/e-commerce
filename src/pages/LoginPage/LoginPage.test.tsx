import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import { LoginPage } from '.';
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '../../utils/validation';

describe('LoginPage', () => {
  test('should display error message when email format is invalid', async () => {
    render(<LoginPage />);

    fireEvent.input(screen.getByRole('textbox', { name: /e\-mail/i }), {
      target: {
        value: 'email',
      },
    });

    const emailError = await screen.findByText(EMAIL_VALIDATION.message);
    expect(emailError).toBeInTheDocument();
  });

  test('should display error message when password is short', async () => {
    render(<LoginPage />);

    fireEvent.input(screen.getByLabelText(/password/i), {
      target: {
        value: 'pass',
      },
    });

    const emailError = await screen.findByText(PASSWORD_VALIDATION.message_length);
    expect(emailError).toBeInTheDocument();
  });
});
