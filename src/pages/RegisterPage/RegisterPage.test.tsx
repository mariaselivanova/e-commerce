import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import { RegisterPage } from '.';
import { EMAIL_VALIDATION, PASSWORD_VALIDATION, VALIDATION_MESSAGES } from '../../utils/validation';
import { MemoryRouter } from 'react-router';

describe('Registration page', () => {
  test('should display required field error on empty fields', async () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText('Sign up!'));

    const requiredError = await screen.findAllByText(VALIDATION_MESSAGES.message_required);
    expect(requiredError.length).toBe(8);
  });

  test('should display error message when email format is invalid', async () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    );

    fireEvent.input(screen.getByRole('textbox', { name: /e\-mail/i }), {
      target: {
        value: 'email',
      },
    });

    const emailError = await screen.findByText(EMAIL_VALIDATION.message);
    expect(emailError).toBeInTheDocument();
  });

  test('should display error message when password is short', async () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    );

    fireEvent.input(screen.getByLabelText(/Password/), {
      target: {
        value: 'Passw1',
      },
    });

    const emailError = await screen.findByText(PASSWORD_VALIDATION.message_length);
    expect(emailError).toBeInTheDocument();
  });

  test('should display error message when first name contains special characters and numbers', async () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    );

    fireEvent.input(screen.getByLabelText(/First name/), {
      target: {
        value: '123',
      },
    });

    const firstNameError = await screen.findByText(VALIDATION_MESSAGES.message_latin);
    expect(firstNameError).toBeInTheDocument();
  });

  test('should display error message when last name contains special characters or numbers', async () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    );

    fireEvent.input(screen.getByLabelText(/Last name/), {
      target: {
        value: '123',
      },
    });

    const lastNameError = await screen.findByText(VALIDATION_MESSAGES.message_latin);
    expect(lastNameError).toBeInTheDocument();
  });

  test('should display error message when street name contains special characters', async () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    );

    fireEvent.input(screen.getByLabelText(/Street address/), {
      target: {
        value: '///',
      },
    });

    const streetError = await screen.findByText(VALIDATION_MESSAGES.message_street);
    expect(streetError).toBeInTheDocument();
  });

  test('should display error message when city field contains special characters or numbers', async () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    );

    fireEvent.input(screen.getByLabelText(/City/), {
      target: {
        value: '123',
      },
    });

    const cityError = await screen.findByText(VALIDATION_MESSAGES.message_latin);
    expect(cityError).toBeInTheDocument();
  });

  test('should display error message when postal field contains symbols other than numbers', async () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    );

    fireEvent.input(screen.getByLabelText(/Postal code/), {
      target: {
        value: 'asd',
      },
    });

    const postalError = await screen.findByText(VALIDATION_MESSAGES.message_postal);
    expect(postalError).toBeInTheDocument();
  });
});
