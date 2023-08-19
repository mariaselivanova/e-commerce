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
import { errorsLogin } from '../../utils/errors';

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

  function createError(errorsList: Record<number, string>, err: number): void {
    const errorMessage = errorsList[err] || 'Whoops. Something went wrong';
    setServerError(errorMessage);
    setIsServerError(true);
  }

  const onSubmitHandler = (data: UserSubmitForm): void => {
    console.log('Root Client', rootClient);
    rootClient.updateWithPasswordFlow(data);
    login(data)
      .then((serverData) => {
        user.setName(serverData.body.customer.firstName as string);
      })

      .catch((err) => {
        createError(errorsLogin, err.code);
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
          <Typography className={styles.serverError} display={isServerError ? 'initial' : 'none'}>
            {serverError}
          </Typography>
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
