import React, { FC, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Stack, Typography, TextField, Button, IconButton } from '@mui/material';
import { schema } from './validationSchema';

import styles from './styles.module.css';
import eyeIcon from '../../assets/icons/eye.svg';
import eyeIconClosed from '../../assets/icons/eye-closed.svg';

export const LoginPage: FC = () => {
  type UserSubmitForm = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmitForm>({ resolver: yupResolver(schema), mode: 'onChange' });

  const onSubmitHandler = (data: UserSubmitForm): void => {
    console.log(errors);
    console.log({ data });
  };

  const [isPassworVisible, setIsPassworVisible] = useState(false);

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
          <Stack className={styles.passwordContainer}>
            <TextField
              className={styles.passwordInput}
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register('password')}
              type={isPassworVisible ? 'text' : 'password'}
              id='input-password'
              label='Password'
            />
            {isPassworVisible ? (
              <IconButton className={styles.iconBtn} onClick={(): void => setIsPassworVisible(!isPassworVisible)}>
                <img className={styles.iconEye} src={eyeIcon} alt='eye' />
              </IconButton>
            ) : (
              <IconButton className={styles.iconBtn} onClick={(): void => setIsPassworVisible(!isPassworVisible)}>
                <img className={styles.iconEye} src={eyeIconClosed} alt='eyeClosed' />
              </IconButton>
            )}
          </Stack>
          <Button variant='contained' size='large' type='submit' className={styles.logInBtn}>
            Log In
          </Button>
        </form>
        <Stack direction='row'>
          <Typography fontSize={'18px'}>New Customer?</Typography>
          <Typography href='/register' component='a' className={styles.link}>
            Create an account
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};
