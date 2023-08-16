import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { render } from '../../utils/test-utils';
import { UserContext } from '../../contexts/userContext';
import { Header } from './index';

describe('Header', () => {
  test('renders logo', () => {
    render(<Header />);
    const logoElement = screen.getByRole('heading', { name: /universe of sparkle/i });
    expect(logoElement).toBeInTheDocument();
  });

  test('renders login and register buttons on main route for unauthorized user', () => {
    render(
      <UserContext.Provider value={null}>
        <Header />
      </UserContext.Provider>,
    );
    const loginButtonElement = screen.getByRole('link', { name: /log in/i });
    const registerButtonElement = screen.getByRole('link', { name: /register/i });

    expect(loginButtonElement).toBeInTheDocument();
    expect(registerButtonElement).toBeInTheDocument();
  });

  test('renders logout button for authorized user', () => {
    render(
      <UserContext.Provider value={{ name: 'user' }}>
        <Header />
      </UserContext.Provider>,
    );

    const logoutButtonElement = screen.getByRole('link', { name: /logout/i });
    expect(logoutButtonElement).toBeInTheDocument();
  });
});
