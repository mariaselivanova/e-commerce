import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';

import React, { FC, ReactElement, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { Controller, useForm } from 'react-hook-form';

import { Stack, Typography, Box, Grid, TextField, Checkbox, FormControlLabel, Button, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MyCustomerDraft } from '@commercetools/platform-sdk';

import { rootClient } from '../../sdk/client';
import { getMe, registerUser } from '../../sdk/requests';

import { COUNTRIES } from '../../utils/countries';
import { schema, SchemaType } from './validationSchema';
import { CustomPasswordInput } from '../../components/CustomPasswordInput';
import { errorsRegister } from '../../utils/errors';
import { UserContext } from '../../contexts/userContext';

import styles from './RegisterPage.module.css';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { UserMessage } from '../../components/UserMessage';

export const RegisterPage: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(schema), mode: 'all' });

  const { windowWidth } = useWindowWidth();

  const [sameAddress, setSameAddress] = useState(true);
  const [defaultBillingAddress, setDefaultBillingAddress] = useState(false);
  const [defaultShippingAddress, setDefaultShippingAddress] = useState(false);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [serverError, setServerError] = useState('');
  const [isServerError, setIsServerError] = useState(false);

  const [succesMessage, setSuccessMessage] = useState(false);

  const user = useContext(UserContext);

  function createError(errorsList: Record<number, string>, err: keyof typeof errorsList): void {
    const errorMessage = errorsList[err] || 'Whoops. Something went wrong';
    setServerError(errorMessage);
    setIsServerError(true);
  }

  const handleUserRegistration = (processedData: MyCustomerDraft): void => {
    setServerError('');
    setIsServerError(false);
    setIsButtonDisabled(true);

    const flowData = {
      email: processedData.email,
      password: processedData.password,
    };

    registerUser(processedData)
      .then((data) => {
        setSuccessMessage(true);
        setTimeout(() => {
          const userName = `${data.body.customer.firstName} ${data.body.customer.lastName}`;
          rootClient.updateWithPasswordFlow(flowData);
          localStorage.setItem('user', userName);
          user.setName(userName);
          getMe();
        }, 2000);
      })
      .catch((err) => {
        createError(errorsRegister, err.code);
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  const onSubmitHandler = (data: SchemaType): void => {
    const INDEX_ADDRESS_BILLING = 0;
    const INDEX_ADDRESS_SHIPPING = 1;

    const billingCountryCode = COUNTRIES.find((e) => e.name === data.billing_country)?.code as string;
    const shippingCountryCode = COUNTRIES.find((e) => e.name === data.shipping_country)?.code as string;
    const dateString = data.date.toISOString().substring(0, 10);

    let street = data.shipping_street;
    let city = data.shipping_city;
    let postal = data.shipping_postal;
    let country = shippingCountryCode;

    if (sameAddress) {
      street = data.billing_street;
      city = data.billing_city;
      postal = data.billing_postal;
      country = billingCountryCode;
    }

    const processedData: MyCustomerDraft = {
      email: data.email,
      password: data.password,
      firstName: data.firstname,
      lastName: data.lastname,
      dateOfBirth: dateString,

      addresses: [
        {
          streetName: data.billing_street,
          city: data.billing_city,
          postalCode: data.billing_postal,
          country: billingCountryCode,
        },
        {
          streetName: street,
          city,
          postalCode: postal,
          country,
        },
      ],

      // поправить просто billing и просто shipping адреса
      defaultBillingAddress: data.defaultBilling ? INDEX_ADDRESS_BILLING : 0,
      defaultShippingAddress: data.defaultShipping ? INDEX_ADDRESS_SHIPPING : 0,
    };

    handleUserRegistration(processedData);
  };

  const closeSuccessMessage = (): void => {
    setSuccessMessage(false);
  };

  return (
    <>
      <Box className={styles.form}>
        <UserMessage onClose={closeSuccessMessage} open={succesMessage} severity='success'>
          You have successfully registered!
        </UserMessage>
        <Typography variant='h4' component='h3' sx={{ color: 'primary.main' }}>
          Sign up
        </Typography>

        <form className={styles.inputs} onSubmit={handleSubmit(onSubmitHandler)}>
          <Grid rowGap={2} container columns={windowWidth < 600 ? 1 : 2} spacing={0}>
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
                render={({ field: { onChange, value = '' } }): ReactElement => (
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
              <CustomPasswordInput error={errors.password} register={register('password')} label={'Password'} />
            </Grid>
            <Grid item xs={1}>
              <CustomPasswordInput error={errors.confirmPassword} register={register('confirmPassword')} label={'Confirm password'} />
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
            <Grid item xs={1} />

            <Grid item xs={2}>
              <Typography variant='h6' component='h6' sx={{ color: 'primary.main' }}>
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
                className={styles.checkbox}
                control={
                  <Checkbox
                    data-testid='sameAddressCheckbox'
                    defaultChecked={true}
                    {...register('sameAddress')}
                    onChange={(): void => {
                      setSameAddress(!sameAddress);
                    }}
                  />
                }
                label='Use the same address for shipping'
              />
            </Grid>
            <Grid className={styles.checkboxes} item xs={2}>
              <FormControlLabel
                className={styles.checkbox}
                control={
                  <Checkbox
                    {...register('defaultBilling')}
                    onChange={(): void => {
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
                  <Typography variant='h6' component='h6' sx={{ color: 'primary.main' }}>
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
                className={styles.checkbox}
                control={
                  <Checkbox
                    {...register('defaultShipping')}
                    onChange={(): void => {
                      setDefaultShippingAddress(!defaultShippingAddress);
                    }}
                  />
                }
                label='Use address as default for shipping'
              />
            </Grid>
          </Grid>

          <Stack alignItems='center'>
            <Typography className={styles.serverError} display={isServerError ? 'initial' : 'none'}>
              {serverError}
            </Typography>
            <Button disabled={isButtonDisabled} className={isButtonDisabled ? styles.button_disabled : styles.button} type='submit'>
              {isButtonDisabled ? '' : 'Sign up!'}
            </Button>
          </Stack>
        </form>
        <Typography className={styles.redirect}>
          Already have an account?{' '}
          <Link className={styles.link} to='/login'>
            Log in!
          </Link>
        </Typography>
      </Box>
    </>
  );
};
