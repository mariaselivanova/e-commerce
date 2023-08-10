import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { Typography, Box, Grid, TextField, Checkbox, FormControlLabel, Button, FormControl, MenuItem } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { COUNTRIES } from '../../utils/countries';

import styles from './style.module.css';
// фикс импортов
export const RegisterPage: FC = () => {
  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const schema = yup.object().shape({
    email: yup.string().email('Email is wrong!').required(),
    password: yup.string().matches(passwordRules, { message: 'Please create a stronger password' }).required(),
    firstname: yup.string().min(1).required('Required'),
    lastname: yup
      .string()
      .min(1)
      .matches(/^[a-zA-ZäöüÄÖÜ]*$/gi)
      .required(),
    date: yup.string().required(),
    street: yup.string().min(1).required(),
    city: yup
      .string()
      .min(1)
      .matches(/^[a-zA-ZäöüÄÖÜ]*$/gi)
      .required(),
    postal: yup.number().required(),
    country: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitHandler = (data: object) => {
    console.log({ data });
    reset();
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Typography variant='h2' component='h2'>
          Register Page
        </Typography>
        <Typography marginTop={'40px'} variant='h4' component='h4'>
          Create an account
        </Typography>
        <Box className={styles.form}>
          <Typography className={styles.formText} variant='h3' component='h3'>
            Sign up
          </Typography>
          <form className={styles.inputs} onSubmit={handleSubmit(onSubmitHandler)}>
            <Grid rowGap={2} container columns={2} spacing={0}>
              <Grid height={'30px'} item xs={1}>
                <TextField helperText={errors.email?.message} {...register('email')} type={'email'} id='input-email' label='E-mail' required />
              </Grid>
              <Grid item xs={1}>
                <TextField
                  helperText={errors.email?.message}
                  {...register('password')}
                  type={'password'}
                  id='input-password'
                  label='Password'
                  required
                />
              </Grid>
              <Grid item xs={1}>
                <TextField {...register('firstname')} type={'text'} id='input-firstname' label='First name' required />
              </Grid>
              <Grid item xs={1}>
                <TextField {...register('lastname')} type={'text'} id='input-lastname' label='Last name' required />
              </Grid>
              <Grid item xs={1}>
                <DatePicker className={styles.date} /*{...register("date")}*/ label='Date of birth' />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={1}>
                <TextField {...register('street')} type={'text'} id='input-street' label='Street' required />
              </Grid>
              <Grid item xs={1}>
                <TextField {...register('city')} type={'text'} id='input-city' label='City' required />
              </Grid>
              <Grid item xs={1}>
                <TextField {...register('postal')} type={'number'} id='input-postal' label='Postal code' required />
              </Grid>
              <Grid item xs={1}>
                <TextField defaultValue='Andorra' select {...register('country')} type={'text'} id='input-country' label='Country' required>
                  {COUNTRIES.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid className={styles.checkboxes} item xs={2}>
                <FormControlLabel className={styles.checkbox} control={<Checkbox defaultChecked />} label='Use address as default for billing' />
                <FormControlLabel className={styles.checkbox} control={<Checkbox defaultChecked />} label='Use address as default for shipping' />
              </Grid>
            </Grid>
            <Button className={styles.button} type='submit'>
              Sign up!
            </Button>
          </form>
          <Typography className={styles.redirect}>
            Already have an account? <Link to='/login'>Log in!</Link>
          </Typography>
        </Box>
      </LocalizationProvider>
    </>
  );
};
