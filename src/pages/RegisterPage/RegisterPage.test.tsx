import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import { RegisterPage } from '.';
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '../../utils/validation';

describe('Registration page', () => {
  it('Checks if sign up box is there', async () => {
    render(<RegisterPage />);

    const signUp = await screen.findByText('Sign up');
    expect(signUp).toBeInTheDocument();
  });
});
