import React, { FC, useContext, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Stack, Typography, TextField, Button } from '@mui/material';
import { schemaLogin } from './validationSchema';

import { CustomPasswordInput } from '../../components/CustomPasswordInput';
import { rootClient } from '../../sdk/client';
import { login } from '../../sdk/requests';
import { UserContext } from '../../contexts/userContext';

import styles from './LoginPage.module.css';

export const LoginPage: FC = () => {
  type UserSubmitForm = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmitForm>({ resolver: yupResolver(schemaLogin), mode: 'onChange' });

  const user = useContext(UserContext);

  const [serverError, setServerError] = useState('');
  const [isServerError, setIsServerError] = useState(false);

  const onSubmitHandler = (data: UserSubmitForm): void => {
    console.log('Root Client', rootClient);
    rootClient.updateWithPasswordFlow(data);
    login(data)
      .then((serverData) => {
        user.setName(serverData.body.customer.firstName as string);
      })

      .catch((e) => {
        console.error(e.message);
        if (e.message === 'Customer account with the given credentials not found.') {
          setServerError(
            "Uh-oh! No match found for that email and password combo. Give it another try, and if you're still stuck, we're here to help!",
          );
        } else if (e.message === 'Failed to fetch') {
          setServerError("Oops! Our cosmic connection hit a snag and we couldn't fetch the data you're seeking. Check your signal and try again.");
        } else {
          setServerError(e.message);
        }
        setIsServerError(e.message);
      });
  };

  return (
    <>
      <Stack className={styles.formContainer}>
        <Typography variant='h4' color={'#41596E'}>
          Log In
        </Typography>
        <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
          <TextField
            error={!!errors.email}
            className={styles.emailInput}
            helperText={errors.email?.message}
            {...register('email')}
            type={'text'}
            id='input-email'
            label='E-mail'
          />
          <CustomPasswordInput error={errors.password} register={register('password')} label={'Password'} />
          <Typography className={styles.serverError} display={isServerError ? 'initial' : 'none'}>{`${serverError}`}</Typography>
          <Button variant='contained' size='large' type='submit' className={styles.logInBtn}>
            Log In
          </Button>
        </form>
        <Stack direction='row'>
          <Typography>New Customer?</Typography>
          <Typography href='/register' component='a' className={styles.link}>
            Create an account
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};
