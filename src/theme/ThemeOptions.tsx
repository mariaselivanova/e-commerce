import { ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#41596E',
    },
    secondary: {
      main: '#CFCCD6',
    },
    error: {
      main: '#FF6464',
    },
    warning: {
      main: '#BAB700',
    },
    success: {
      main: '#60935D',
    },
    text: {
      primary: '#37393A',
      secondary: 'rgba(55,57,58,0.8)',
      disabled: 'rgba(55,57,58,0.5)',
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          borderRadius: 100,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '80%',
        },
      },
    },
  },
};

export { themeOptions };
