import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Oz dashboard account screen', () => {
  render(<App />);

  expect(screen.getByText(/Phicil-itate Change/i)).toBeInTheDocument();
  expect(screen.getByText(/Welcome to your Oz dashboard/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Create account/i })).toBeInTheDocument();
});
