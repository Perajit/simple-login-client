import { FC, PropsWithChildren } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import LogInPage from './LoginPage';

const createRouterWrapper: FC<PropsWithChildren> = ({ children }) => (
  <MemoryRouter initialEntries={['/login']}>{children}</MemoryRouter>
);

describe('Login Page', () => {
  test('renders login form', () => {
    render(<LogInPage />, {
      wrapper: createRouterWrapper,
    });
  
    const loginFormTitle = screen.getByText('Sign In');
    expect(loginFormTitle).toBeInTheDocument();

    const userNameInput = screen.getByLabelText(/email/i);
    expect(userNameInput).toBeInTheDocument();

    const passwordInput = screen.getByLabelText(/email/i);
    expect(passwordInput).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeInTheDocument();
  });

  test('Shows form validation error for missing required fields', async () => {
    render(<LogInPage />, {
      wrapper: createRouterWrapper,
    });

    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/email/i)).toHaveAttribute('aria-invalid', 'true');
    });

    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByLabelText(/password/i)).toHaveAttribute('aria-invalid', 'true');
    });

    await waitFor(() => {
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  test('Shows form validation error for invalid email format', async () => {
    render(<LogInPage />, {
      wrapper: createRouterWrapper,
    });

    userEvent.type(screen.getByLabelText(/email/i), 'user@mail');
    userEvent.type(screen.getByLabelText(/password/i), 'password');
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/email/i)).toHaveAttribute('aria-invalid', 'true');
    });

    await waitFor(() => {
      expect(screen.getByLabelText(/password/i)).toHaveAttribute('aria-invalid', 'false');
    });
  });
});
