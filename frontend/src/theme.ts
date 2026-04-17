import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00e5ff',
      light: '#6effff',
      dark: '#00b2cc',
    },
    secondary: {
      main: '#b388ff',
      light: '#e7b9ff',
      dark: '#805acb',
    },
    background: {
      default: '#0a0e17',
      paper: 'rgba(20, 25, 35, 0.65)',
    },
    text: {
      primary: '#e0e7ff',
      secondary: '#94a3b8',
    },
  },
  typography: {
    fontFamily: '"Outfit", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      background: 'linear-gradient(45deg, #00e5ff 30%, #b388ff 90%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h4: {
      fontWeight: 600,
      color: '#e0e7ff',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(20, 25, 35, 0.4)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 16,
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 48px 0 rgba(0, 229, 255, 0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
          boxShadow: '0 4px 14px 0 rgba(0, 229, 255, 0.3)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(0, 229, 255, 0.4)',
            transform: 'scale(1.02)',
          },
        },
      },
    },
  },
});

export default theme;
