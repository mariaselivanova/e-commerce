import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import { LoginPage } from '.';
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '../../utils/validation';
import { renderWithRouter } from '../../utils/test-utils';

describe('LoginPage', () => {
  test('should display error message when email format is invalid', async () => {
    renderWithRouter(<LoginPage />);

    fireEvent.input(screen.getByRole('textbox', { name: /e\-mail/i }), {
      target: {
        value: 'email',
      },
    });

    const emailError = await screen.findByText(EMAIL_VALIDATION.message);
    expect(emailError).toBeInTheDocument();
  });

  test('should display error message when password is short', async () => {
    renderWithRouter(<LoginPage />);

    fireEvent.input(screen.getByLabelText(/password/i), {
      target: {
        value: 'pa ss',
      },
    });

    const emailError = await screen.findByText(PASSWORD_VALIDATION.message_whitespaces);
    expect(emailError).toBeInTheDocument();
  });
});
