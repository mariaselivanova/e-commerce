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
      main: '#54C24E',
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
          textTransform: 'none',
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

const themeOptionsDark: ThemeOptions = {
  palette: {
    mode: 'dark',
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
      main: '#54C24E',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255,255,255,0.8)',
      disabled: 'rgba(255,255,255,0.5)',
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
  },
};

export { themeOptions, themeOptionsDark };
