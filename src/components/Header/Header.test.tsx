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
      <UserContext.Provider value={{ name: 'user', setName: () => {}, cart: null, setCart: () => {} }}>
        <Header />
      </UserContext.Provider>,
    );

    const loginButtonElements = screen.getAllByRole('link', { name: /log in/i });
    const registerButtonElements = screen.getAllByRole('link', { name: /register/i });

    expect(loginButtonElements).toHaveLength(2);
    expect(registerButtonElements).toHaveLength(2);
  });

  test('renders logout button for authorized user', () => {
    renderWithRouter(
      <UserContext.Provider value={{ name: 'user', setName: () => {}, cart: null, setCart: () => {} }}>
        <Header />
      </UserContext.Provider>,
    );

    const logoutButtonElement = screen.getByRole('button', { name: /logout/i });
    expect(logoutButtonElement).toBeInTheDocument();
  });
});
