import { createTheme } from '@mui/material';

export const registerTheme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'filled',
      },
      styleOverrides: {
        root: {
          width: '80%',

          color: '#37393a',
          fontWeight: '700',

          borderRadius: '10px',
          backgroundColor: '#CFCCD6',
          label: {
            fontWeight: '700',
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          maxWidth: 'fit-content',
          margin: '0 auto',
          marginTop: '40px',
          padding: '10px 40px',

          color: '#37393a',
          textTransform: 'none',

          backgroundColor: '#CFCCD6',
          borderRadius: '100px',
        },
      },
    },

    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          width: '90%',
        },
      },
    },
  },
});
