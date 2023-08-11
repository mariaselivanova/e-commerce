import * as yup from 'yup';
import moment from 'moment';

import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { Controller, useForm } from 'react-hook-form';

import { Typography, Box, Grid, TextField, Checkbox, FormControlLabel, Button, MenuItem } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';

import { COUNTRIES } from '../../utils/countries';

import styles from './style.module.css';

export const RegisterPage: FC = () => {
  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const postalRules = /^\d{6}$/;

  const schema = yup.object().shape({
    email: yup.string().required('Required field!').email('Please type an email of correct type!'),
    password: yup
      .string()
      .required('Required field!')
      .matches(passwordRules, { message: 'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase and 1 number!' }),
    confirmPassword: yup
      .string()
      .required('Retype your password!')
      .oneOf([yup.ref('password')], 'Your passwords do not match.'),
    firstname: yup.string().required('Required field!').min(1, 'Must be at least 1 character!'),
    lastname: yup
      .string()
      .required('Required field!')
      .min(1, 'Must be at least 1 character!')
      .matches(/^[a-zA-Z]*$/gi, 'Must not contain special characters and numbers!'),
    date: yup
      .string()
      .required('Required field!')
      .nullable()
      .test('Date of birth', 'You must be 13 years or older', function (value) {
        return moment().diff(moment(value, 'YYYY-MM-DD'), 'years') >= 13;
      }),
    billing_street: yup.string().required('Required field!').min(1, 'Must be at least 1 character!'),
    billing_city: yup
      .string()
      .required('Required field!')
      .min(1, 'Must be at least 1 character!')
      .matches(/^[a-zA-Z]*$/gi, 'Must not contain special characters and numbers!'),
    billing_postal: yup.string().required('Required field!').matches(postalRules, 'Postal code can only contain 6 numbers!'),
    billing_country: yup.string().required('Required field!'),

    shipping_street: yup.string().required('Required field!').min(1, 'Must be at least 1 character!'),
    shipping_city: yup
      .string()
      .required('Required field!')
      .min(1, 'Must be at least 1 character!')
      .matches(/^[a-zA-Z]*$/gi, 'Must not contain special characters and numbers!'),
    shipping_postal: yup.string().required('Required field!').matches(postalRules, 'Postal code can only contain 6 numbers!'),
    shipping_country: yup.string().required('Required field!'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitHandler = (data: object) => {
    console.log(errors);
    console.log({ data });
  };

  const [value, setValue] = useState('');

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e?.target as HTMLInputElement;
    setValue(input.value);
    console.log(value, value.length);
  };

  return (
    <>
      <Box className={styles.form}>
        <Typography className={styles.formText} variant='h3' component='h3'>
          Sign up
        </Typography>

        <form className={styles.inputs} onSubmit={handleSubmit(onSubmitHandler)}>
          <Grid rowGap={2} container columns={2} spacing={0}>
            <Grid className={styles.grid} item xs={1}>
              <TextField
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register('email')}
                type={'text'}
                id='input-email'
                label='E-mail'
              />
            </Grid>
            <Grid item xs={1}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name='date'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      label='Date of birth'
                      slotProps={{
                        textField: {
                          error: !!errors.date,
                          helperText: errors.date?.message,
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={1}>
              <TextField
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register('password')}
                type={'password'}
                id='input-password'
                label='Password'
                autoComplete={'new-password'}
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                {...register('confirmPassword')}
                type={'password'}
                id='input-confirm-password'
                label='Confirm password'
                autoComplete={'new-password'}
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
                label='Street address'
                placeholder='308 Negra Arroyo Lane'
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
                placeholder='Albuquerque'
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
                value={value}
                onChange={handle}
                placeholder='000000'
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                error={!!errors.billing_country}
                helperText={errors.billing_country?.message}
                defaultValue={COUNTRIES[3].name}
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
              <FormControlLabel className={styles.checkbox} control={<Checkbox />} label='Use address as default for billing' />
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
                label='Street address'
                placeholder='742 Evergreen Terrace'
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
                placeholder='Springfield'
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
                placeholder='000000'
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                error={!!errors.shipping_country}
                helperText={errors.shipping_country?.message}
                defaultValue={COUNTRIES[3].name}
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
