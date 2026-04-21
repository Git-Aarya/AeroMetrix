// Jest tests for the AeroMetrix React app, verifying the dashboard title and Sync Flight Logs button render correctly.
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock matchMedia for Material UI
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })
});

describe('AeroMetrix App', () => {
  it('renders the dashboard title successfully', async () => {
    render(<App />);
    const heading = await screen.findByText(/AeroMetrix/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders the Sync Flight Logs button', async () => {
    render(<App />);
    const button = await screen.findByRole('button', { name: /Sync Flight Logs/i });
    expect(button).toBeInTheDocument();
  });
});
