import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';

import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { Controller, useForm } from 'react-hook-form';

import { Typography, Box, Grid, TextField, Checkbox, FormControlLabel, Button, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { COUNTRIES } from '../../utils/countries';
import { schema } from './validationSchema';

import styles from './style.module.css';

export const RegisterPage: FC = () => {
  interface UserSubmitForm {
    email: string;
    password: string;
    confirmPassword: string;
    firstname: string;
    lastname: string;
    date: Date;

    billing_street: string;
    billing_city: string;
    billing_postal: string;
    billing_country: string;

    shipping_street?: string | undefined;
    shipping_city?: string | undefined;
    shipping_postal?: string | undefined;
    shipping_country?: string | undefined;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  const onSubmitHandler = (data: UserSubmitForm) => {
    console.log(errors);
    console.log('Use same adress option: ' + sameAddress);
    console.log('Use billing address as default option: ' + defaultBillingAddress);
    console.log('Use shipping address as default option: ' + defaultShippingAddress);
    console.log({ data });
  };

  const [sameAddress, setSameAddress] = useState(true);
  const [defaultBillingAddress, setDefaultBillingAddress] = useState(false);
  const [defaultShippingAddress, setDefaultShippingAddress] = useState(false);

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
              <Controller
                control={control}
                name='date'
                render={({ field: { onChange, value = '' } }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label='Birthday'
                      disableFuture
                      value={value}
                      onChange={onChange}
                      format={'DD-MM-YYYY'}
                      slotProps={{
                        textField: {
                          helperText: errors.date?.message,
                          error: !!errors.date,
                        },
                      }}
                      minDate={dayjs().subtract(130, 'year') as unknown as Date}
                    />
                  </LocalizationProvider>
                )}
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
              <FormControlLabel
                name='useSameAddress'
                className={styles.checkbox}
                control={
                  <Checkbox
                    defaultChecked={true}
                    onChange={() => {
                      setSameAddress(!sameAddress);
                    }}
                  />
                }
                label='Use the same address for shipping'
              />
            </Grid>
            <Grid className={styles.checkboxes} item xs={2}>
              <FormControlLabel
                name='defaultBillingAddress'
                className={styles.checkbox}
                control={
                  <Checkbox
                    onChange={() => {
                      setDefaultBillingAddress(!defaultBillingAddress);
                    }}
                  />
                }
                label='Use address as default for billing'
              />
            </Grid>
            {!sameAddress ? (
              <>
                <Grid item xs={2}>
                  <Typography variant='h6' component='h6'>
                    Shipping address
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <TextField
                    disabled={sameAddress}
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
                    disabled={sameAddress}
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
                    disabled={sameAddress}
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
                    disabled={sameAddress}
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
              </>
            ) : null}
            <Grid className={styles.checkboxes} item xs={2}>
              <FormControlLabel
                name='defaultBillingAddress'
                className={styles.checkbox}
                control={
                  <Checkbox
                    onChange={() => {
                      setDefaultShippingAddress(!defaultShippingAddress);
                    }}
                  />
                }
                label='Use address as default for shipping'
              />
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
