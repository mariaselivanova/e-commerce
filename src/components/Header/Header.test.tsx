import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

import { UserContext } from '../../contexts/userContext';
import { renderWithRouter } from '../../utils/test-utils';

import { Header } from '.';

describe('Header', () => {
  test('renders logo', () => {
    renderWithRouter(<Header />);
    const logoElement = screen.getByRole('heading', { name: /universe of sparkle/i });
    expect(logoElement).toBeInTheDocument();
  });

  test('renders login and register buttons for unauthorized user', () => {
    renderWithRouter(
      <UserContext.Provider value={{ name: null, setName: () => {} }}>
        <Header />
      </UserContext.Provider>,
    );

    const loginButtonElement = screen.getByRole('link', { name: /log in/i });
    const registerButtonElement = screen.getByRole('link', { name: /register/i });

    expect(loginButtonElement).toBeInTheDocument();
    expect(registerButtonElement).toBeInTheDocument();
  });

  test('renders logout button for authorized user', () => {
    renderWithRouter(
      <UserContext.Provider value={{ name: 'user', setName: () => {} }}>
        <Header />
      </UserContext.Provider>,
    );

    const logoutButtonElement = screen.getByRole('link', { name: /logout/i });
    expect(logoutButtonElement).toBeInTheDocument();
  });
});
