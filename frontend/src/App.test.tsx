import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Mock matchMedia for Material UI
window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

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
