import * as yup from 'yup';
import moment from 'moment';

import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import { Typography, Box, Grid, TextField, Checkbox, FormControlLabel, Button, MenuItem } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';

import { COUNTRIES } from '../../utils/countries';

import styles from './style.module.css';
// фикс импортов
export const RegisterPage: FC = () => {
  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const postalRules = /^[A-z0-9\s]*$/;

  const schema = yup.object().shape({
    email: yup.string().email('Please type an email of correct type!').required('Required field!'),
    password: yup
      .string()
      .matches(passwordRules, { message: 'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase and 1 number!' })
      .required(),
    firstname: yup.string().min(1, 'Must be at least 1 character!').required('Required field!'),
    lastname: yup
      .string()
      .min(1, 'Must be at least 1 character!')
      .matches(/^[a-zA-Z]*$/gi, 'Must not contain special characters and numbers!')
      .required(),
    // date: yup
    // .string()
    // .nullable()
    // .test("Date of birth", "You must be 18 years or older", function (value) {
    //   return moment().diff(moment(value, "YYYY-MM-DD"), "years") >= 13;
    // })
    // .required(),
    billing_street: yup.string().min(1, 'Must be at least 1 character!').required(),
    billing_city: yup
      .string()
      .min(1, 'Must be at least 1 character!')
      .matches(/^[a-zA-Z]*$/gi, 'Must not contain special characters and numbers!')
      .required(),
    billing_postal: yup.string().matches(postalRules, 'Postal code must not contain special symbols!').required('Required field!'),
    billing_country: yup.string().required(),

    shipping_street: yup.string().min(1, 'Must be at least 1 character!').required(),
    shipping_city: yup
      .string()
      .min(1, 'Must be at least 1 character!')
      .matches(/^[a-zA-Z]*$/gi, 'Must not contain special characters and numbers!')
      .required(),
    shipping_postal: yup.string().matches(postalRules, 'Postal code must not contain special symbols!').required('Required field!'),
    shipping_country: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitHandler = (data: object) => {
    console.log(errors);
    console.log({ data });
  };

  return (
    <>
      <Typography variant='h2' component='h2'>
        Register Page
      </Typography>
      <Typography variant='h4' component='h4'>
        Create an account
      </Typography>
      <Box className={styles.form}>
        <Typography className={styles.formText} variant='h3' component='h3'>
          Sign up
        </Typography>

        <form className={styles.inputs} onSubmit={handleSubmit(onSubmitHandler)}>
          <Grid rowGap={2} container columns={2} spacing={0}>
            <Grid height={'30px'} item xs={1}>
              <TextField
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register('email')}
                type={'email'}
                id='input-email'
                label='E-mail'
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register('password')}
                type={'password'}
                id='input-password'
                label='Password'
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                error={!!errors.firstname}
                helperText={errors.firstname?.message}
                {...register('firstname')}
                type={'text'}
                id='input-firstname'
                label='First name'
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                error={!!errors.lastname}
                helperText={errors.lastname?.message}
                {...register('lastname')}
                type={'text'}
                id='input-lastname'
                label='Last name'
              />
            </Grid>
            <Grid item xs={1}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker disableFuture className={styles.date} /*{...register("date")}*/ label='Date of birth' />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={1}></Grid>

            <Grid item xs={2}>
              <Typography variant='h6' component='h6'>
                Billing address
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <TextField
                error={!!errors.billing_street}
                helperText={errors.billing_street?.message}
                {...register('billing_street')}
                type={'text'}
                id='input-street-billing'
                label='Street'
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                error={!!errors.billing_city}
                helperText={errors.billing_city?.message}
                {...register('billing_city')}
                type={'text'}
                id='input-city-billing'
                label='City'
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                error={!!errors.billing_postal}
                helperText={errors.billing_postal?.message}
                {...register('billing_postal')}
                type={'text'}
                id='input-postal-billing'
                label='Postal code'
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                error={!!errors.billing_country}
                helperText={errors.billing_country?.message}
                defaultValue={COUNTRIES[0].name}
                className={styles.city_input}
                select
                {...register('billing_country')}
                type={'text'}
                id='input-country-billing'
                label='Country'
              >
                {COUNTRIES.map((option) => (
                  <MenuItem key={option.name} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid className={styles.checkboxes} item xs={2}>
              <FormControlLabel className={styles.checkbox} control={<Checkbox />} label='Use the same address for shipping' />
            </Grid>

            <Grid item xs={2}>
              <Typography variant='h6' component='h6'>
                Shipping address
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <TextField
                error={!!errors.shipping_street}
                helperText={errors.shipping_street?.message}
                {...register('shipping_street')}
                type={'text'}
                id='input-street-shipping'
                label='Street'
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                error={!!errors.shipping_city}
                helperText={errors.shipping_city?.message}
                {...register('shipping_city')}
                type={'text'}
                id='input-city-shipping'
                label='City'
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                error={!!errors.shipping_postal}
                helperText={errors.shipping_postal?.message}
                {...register('shipping_postal')}
                type={'text'}
                id='input-postal-shipping'
                label='Postal code'
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                error={!!errors.shipping_country}
                helperText={errors.shipping_country?.message}
                defaultValue={COUNTRIES[0].name}
                className={styles.city_input}
                select
                {...register('shipping_country')}
                type={'text'}
                id='input-country-shipping'
                label='Country'
              >
                {COUNTRIES.map((option) => (
                  <MenuItem key={option.name} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid className={styles.checkboxes} item xs={2}>
              <FormControlLabel className={styles.checkbox} control={<Checkbox />} label='Use address as default for billing' />
              <FormControlLabel className={styles.checkbox} control={<Checkbox />} label='Use address as default for shipping' />
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
    </>
  );
};
