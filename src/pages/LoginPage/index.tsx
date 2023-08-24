import React, { FC, useContext, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Stack, Typography, TextField, Button } from '@mui/material';
import { schemaLogin } from './validationSchema';

import { errorsLogin } from '../../utils/errors';
import { registerRoute } from '../../utils/routes';
import { rootClient } from '../../sdk/client';
import { getMe, loginUser } from '../../sdk/requests';
import { UserContext } from '../../contexts/userContext';

import { CustomPasswordInput } from '../../components/CustomPasswordInput';

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

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  function createError(errorsList: Record<number, string>, err: number): void {
    const errorMessage = errorsList[err] || 'Whoops. Something went wrong';
    setServerError(errorMessage);
    setIsServerError(true);
  }

  const onSubmitHandler = (data: UserSubmitForm): void => {
    setServerError('');
    setIsServerError(false);
    setIsButtonDisabled(true);

    loginUser(data)
      .then((serverData) => {
        const userName = `${serverData.body.customer.firstName} ${serverData.body.customer.lastName}`;

        user.setName(userName);
        localStorage.setItem('user', userName);
        rootClient.updateWithPasswordFlow(data);
        getMe();
      })
      .catch((err) => {
        createError(errorsLogin, err.code);
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  return (
    <div className={styles.body}>
      <Stack className={styles.formContainer}>
        <Typography variant='h4' sx={{ color: 'primary.main' }}>
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
          <Button disabled={isButtonDisabled} className={isButtonDisabled ? styles.button_disabled : styles.button} type='submit'>
            {isButtonDisabled ? '' : 'Log In'}
          </Button>
        </form>
        <Stack direction='row'>
          <Typography>New Customer?</Typography>
          <Typography href={registerRoute} component='a' className={styles.link}>
            Create an account
          </Typography>
        </Stack>
      </Stack>
    </div>
  );
};
