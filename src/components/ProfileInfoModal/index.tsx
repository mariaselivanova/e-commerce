import React, { FC, ReactElement, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, Modal, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import styles from './ProfileInfoModal.module.css';
import { schema, SchemaType } from './validationSchema';

interface InfoModalProps {
  open: boolean;
  handleClose: () => void;
}

export const ProfileInfoModal: FC<InfoModalProps> = ({ open, handleClose }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(schema), mode: 'all' });

  const onSubmitHandler = (data: SchemaType): void => {
    setIsSuccess(true);
    setTimeout(() => {
      handleClose();
      console.log(data);
      setIsSuccess(false);
    }, 2000);
  };

  return (
    <>
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
              <Button disabled={isSuccess} className={styles.button} variant='contained' type='submit'>
                {isSuccess ? 'Info changed!' : 'Save'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Modal>
    </>
  );
};
