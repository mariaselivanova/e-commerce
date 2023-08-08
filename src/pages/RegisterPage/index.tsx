import React, { FC, useState } from 'react';
import { registerTheme } from './theme';
import { Stack, Typography, Box, Grid, TextField, Checkbox, FormControlLabel, Button, ThemeProvider } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './style.module.css';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const RegisterPage: FC = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [streetValue, setStreetValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [postalValue, setPostalValue] = useState('');
  const [countryValue, setCountryValue] = useState('');

  const checkInputValidation = function () {
    return true;
  };

  const handleSignUp = function () {
    const areCorrect = checkInputValidation();
    if (areCorrect) {
      console.log('signing up!');
    }
  };

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
          <form onSubmit={handleSignUp}>
            <Grid rowGap={4} className={styles.inputs} container columns={2} spacing={0}>
              <Grid item xs={1}>
                <TextField
                  value={emailValue}
                  onChange={(e) => {
                    setEmailValue(e.target.value);
                  }}
                  type={'email'}
                  InputProps={{ disableUnderline: true }}
                  id='input-email'
                  label='E-mail'
                />
              </Grid>
              <Grid item xs={1}>
                <TextField
                  value={passwordValue}
                  onChange={(e) => {
                    setPasswordValue(e.target.value);
                  }}
                  type={'password'}
                  InputProps={{ disableUnderline: true }}
                  id='input-password'
                  label='Password'
                />
              </Grid>
              <Grid item xs={1}>
                <TextField
                  value={firstNameValue}
                  onChange={(e) => {
                    setFirstNameValue(e.target.value);
                  }}
                  type={'text'}
                  InputProps={{ disableUnderline: true }}
                  id='input-firstname'
                  label='First name'
                />
              </Grid>
              <Grid item xs={1}>
                <TextField
                  value={lastNameValue}
                  onChange={(e) => {
                    setLastNameValue(e.target.value);
                  }}
                  type={'text'}
                  InputProps={{ disableUnderline: true }}
                  id='input-lastname'
                  label='Last name'
                />
              </Grid>
              <Grid item xs={1}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker value={dateValue} label='Date of birth' />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={1}>
                <TextField
                  value={streetValue}
                  onChange={(e) => {
                    setStreetValue(e.target.value);
                  }}
                  type={'text'}
                  InputProps={{ disableUnderline: true }}
                  id='input-street'
                  label='Street'
                />
              </Grid>
              <Grid item xs={1}>
                <TextField
                  value={cityValue}
                  onChange={(e) => {
                    setCityValue(e.target.value);
                  }}
                  type={'text'}
                  InputProps={{ disableUnderline: true }}
                  id='input-city'
                  label='City'
                />
              </Grid>
              <Grid item xs={1}>
                <TextField
                  value={postalValue}
                  onChange={(e) => {
                    setPostalValue(e.target.value);
                  }}
                  type={'number'}
                  InputProps={{ disableUnderline: true }}
                  id='input-postal'
                  label='Postal code'
                />
              </Grid>
              <Grid item xs={1}>
                <TextField
                  value={countryValue}
                  onChange={(e) => {
                    setCountryValue(e.target.value);
                  }}
                  type={'text'}
                  InputProps={{ disableUnderline: true }}
                  id='input-country'
                  label='Country'
                />
              </Grid>
              <Grid item xs={2}>
                <FormControlLabel className={styles.checkbox} control={<Checkbox defaultChecked />} label='Use address as default for billing' />
                <FormControlLabel className={styles.checkbox} control={<Checkbox defaultChecked />} label='Use address as default for shipping' />
              </Grid>
            </Grid>
          </form>
          <Button type='submit'>Sign up!</Button>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default RegisterPage;
