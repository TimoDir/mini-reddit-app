import { render, screen } from '@testing-library/react';
import App from './App';

// Test the Component APP

describe('App', () =>{
  test('renders App', () => {
    render(<App />);
    const linkElement = screen.getByText(/Reddit/);
    expect(linkElement).toBeInTheDocument();
  });
});