import React, { FC } from 'react';
import { registerTheme } from './pageTheme';
import { Stack, Typography, Box, Grid, TextField, Checkbox, FormControlLabel, Button, ThemeProvider } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './RegisterPage.module.css';

const RegisterPage: FC = () => {
  return (
    <>
      <ThemeProvider theme={registerTheme}>
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
          <Typography className={styles.formText} variant='h3' component='h3'>
            Sign up
          </Typography>
          <Grid rowGap={4} className={styles.inputs} container columns={2} spacing={0}>
            <Grid item xs={1}>
              <TextField InputProps={{ disableUnderline: true }} id='input-email' label='E-mail' />
            </Grid>
            <Grid item xs={1}>
              <TextField InputProps={{ disableUnderline: true }} id='input-password' label='Password' />
            </Grid>
            <Grid item xs={1}>
              <TextField InputProps={{ disableUnderline: true }} id='input-firstname' label='First name' />
            </Grid>
            <Grid item xs={1}>
              <TextField InputProps={{ disableUnderline: true }} id='input-lastname' label='Last name' />
            </Grid>
            <Grid item xs={1}>
              <TextField InputProps={{ disableUnderline: true }} id='input-date' label='Date of birth' />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={1}>
              <TextField InputProps={{ disableUnderline: true }} id='input-street' label='Street' />
            </Grid>
            <Grid item xs={1}>
              <TextField InputProps={{ disableUnderline: true }} id='input-city' label='City' />
            </Grid>
            <Grid item xs={1}>
              <TextField InputProps={{ disableUnderline: true }} id='input-postal' label='Postal code' />
            </Grid>
            <Grid item xs={1}>
              <TextField InputProps={{ disableUnderline: true }} id='input-country' label='Country' />
            </Grid>
            <Grid item xs={2}>
              <FormControlLabel className={styles.checkbox} control={<Checkbox defaultChecked />} label='Use address as default for billing' />
              <FormControlLabel className={styles.checkbox} control={<Checkbox defaultChecked />} label='Use address as default for shipping' />
            </Grid>
          </Grid>
          <Button>Sign up!</Button>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default RegisterPage;
