import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import { RegisterPage } from '.';
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '../../utils/validation';
import { MemoryRouter } from 'react-router';

describe('Registration page', () => {
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

  // test('should display required field error on empty fields', async () => {
  //   render(
  //     <MemoryRouter>
  //       <RegisterPage />
  //     </MemoryRouter>,
  //   );

  //   fireEvent.click(screen.getByText('Sign up!'));

  //   const requiredError = await screen.findByText('Required field!');
  //   expect(requiredError).toBeInTheDocument();
  // });

  test('displays error message when password is short', async () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    );

    fireEvent.input(screen.getByLabelText(/Password/), {
      target: {
        value: 'pass',
      },
    });

    const emailError = await screen.findByText(PASSWORD_VALIDATION.message_length);
    expect(emailError).toBeInTheDocument();
  });

  test('displays error message when first name contains special characters and numbers', async () => {
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

    const firstNameError = await screen.findByText('Must only contain latin characters!');
    expect(firstNameError).toBeInTheDocument();
  });

  test('displays error message when last name contains special characters or numbers', async () => {
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

    const lastNameError = await screen.findByText('Must only contain latin characters!');
    expect(lastNameError).toBeInTheDocument();
  });

  test('displays error message when street name contains special characters', async () => {
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

    const streetError = await screen.findByText('Street name can only have latin characters, dots, numbers and whitespaces!');
    expect(streetError).toBeInTheDocument();
  });

  test('displays error message when city field contains special characters or numbers', async () => {
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

    const cityError = await screen.findByText('Must only contain latin characters!');
    expect(cityError).toBeInTheDocument();
  });

  test('displays error message when postal field contains other than numbers', async () => {
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

    const postalError = await screen.findByText('Postal code can only contain 6 numbers!');
    expect(postalError).toBeInTheDocument();
  });

  // test('if sameAddress checkbox toggle is displaying shipping address fields', async () => {
  //   render(
  //     <MemoryRouter>
  //       <RegisterPage />
  //     </MemoryRouter>,
  //   );

  //   fireEvent.click(screen.getByLabelText(/Use the same address for shipping/));
  //   expect(screen.getByTestId
  // })
});
