import React, { Dispatch, FC, ReactElement, SetStateAction, useState } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import { schema, SchemaType } from './validationSchema';
import { getMe, updateCustomerInfo } from '../../sdk/requests';

import styles from './ProfileInfoModal.module.css';

interface IUserState {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  email: string;
}

interface InfoModalProps {
  open: boolean;
  handleClose: () => void;
  setUser: Dispatch<SetStateAction<IUserState>>;
}

export const ProfileInfoModal: FC<InfoModalProps> = ({ open, handleClose, setUser }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(schema), mode: 'all' });

  const [error, setError] = useState('');

  const onSubmitHandler = (data: SchemaType): void => {
    setIsButtonDisabled(true);
    setError('');
    getMe().then((customerData) => {
      const { id } = customerData.body;
      const { version } = customerData.body;
      updateCustomerInfo(data, id, version)
        .then(() => {
          setIsButtonDisabled(false);
          setIsSuccess(true);
          setTimeout(() => {
            setUser({
              firstName: data.firstname,
              lastName: data.lastname,
              dateOfBirth: data.date.toISOString().substring(0, 10).split('-').reverse().join('.'),
              email: data.email,
            });
            handleClose();
            setIsSuccess(false);
          }, 3000);
        })
        .catch((err) => {
          setIsButtonDisabled(false);
          if (err.code === 400) {
            setError('User with this email is already registered!');
          } else setError('Whoops. Something went wrong!');
        });
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
        <Grid className={styles.modal} container rowGap={2} columns={2}>
          <Grid item xs={1}>
            <TextField
              className={styles.textfield}
              error={!!errors.firstname}
              helperText={errors.firstname?.message}
              {...register('firstname')}
              type={'text'}
              id='input-firstname'
              label='First Name'
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              error={!!errors.lastname}
              helperText={errors.lastname?.message}
              {...register('lastname')}
              type={'text'}
              id='input-lastname'
              label='Last Name'
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
            <TextField
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email')}
              type={'text'}
              id='input-email'
              label='E-mail'
            />
          </Grid>
          <Grid item xs={2}>
            {error ? <Typography className={styles.serverError}>{error}</Typography> : null}
            {isSuccess ? <Typography className={styles.serverError}>Info changed!</Typography> : null}
            <Button
              disabled={isButtonDisabled}
              className={isButtonDisabled ? styles.button_disabled : styles.button}
              variant='contained'
              type='submit'
            >
              {isButtonDisabled ? '' : 'Save'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Modal>
  );
};
