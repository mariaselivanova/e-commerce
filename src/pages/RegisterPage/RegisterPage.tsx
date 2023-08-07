import React, { FC } from 'react';
import { Stack, Typography, Box, Grid, TextField, createTheme, styled, TextFieldProps, alpha, Checkbox, FormControlLabel } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './RegisterPage.module.css';

const RegisterPage: FC = () => {
  const MyTextField = styled(TextField)<TextFieldProps>(() => ({
    width: '80%',
    backgroundColor: '#CFCCD6',
    color: '#37393a',
    borderRadius: '10px',
    '& label.Mui-focused': {
      color: '#fff',
    },
    '& .MuifilledInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'white',
        borderRadius: '10px',
      },
    },
  }));

  return (
    <>
      <Typography variant='h2' component='h2'>
        Register Page
      </Typography>
      <Typography marginTop={'40px'} variant='h4' component='h4'>
        Create an account
      </Typography>
      <Stack spacing={1} direction='row'>
        <Typography>Already have an account?</Typography>
        <Link to='/login'>
          <Typography>Log in</Typography>
        </Link>
      </Stack>
      <Box className={styles.form}>
        <Typography marginTop={'40px'} className={styles.formText} variant='h3' component='h3'>
          Sign up
        </Typography>
        <Grid rowGap={4} className={styles.inputs} container columns={2} spacing={0}>
          <Grid item xs={1}>
            <MyTextField id='filled-basic' label='E-mail' variant='filled' />
          </Grid>
          <Grid item xs={1}>
            <MyTextField id='filled-basic' label='Password' variant='filled' />
          </Grid>
          <Grid item xs={1}>
            <MyTextField id='filled-basic' label='First name' variant='filled' />
          </Grid>
          <Grid item xs={1}>
            <MyTextField id='filled-basic' label='Last name' variant='filled' />
          </Grid>
          <Grid item xs={1}>
            <MyTextField id='filled-basic' label='Date of birth' variant='filled' />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}>
            <MyTextField id='filled-basic' label='Street' variant='filled' />
          </Grid>
          <Grid item xs={1}>
            <MyTextField id='filled-basic' label='City' variant='filled' />
          </Grid>
          <Grid item xs={1}>
            <MyTextField id='filled-basic' label='Postal code' variant='filled' />
          </Grid>
          <Grid item xs={1}>
            <MyTextField id='filled-basic' label='Country' variant='filled' />
          </Grid>
        </Grid>
        <FormControlLabel control={<Checkbox defaultChecked />} label='Label' />
      </Box>
    </>
  );
};

export default RegisterPage;
