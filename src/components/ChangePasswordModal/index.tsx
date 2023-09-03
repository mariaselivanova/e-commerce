import { yupResolver } from '@hookform/resolvers/yup';

import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Box, Button, Stack, Typography } from '@mui/material';

import { getMe, updateCustomerPassword } from '../../sdk/requests';
import { rootClient } from '../../sdk/client';
import { IUserState } from '../../utils/types';
import { schemaPassword } from './validationSchema';
import { CustomPasswordInput } from '../CustomPasswordInput';

import styles from './ChangePasswordModal.module.css';

interface PasswordModalProps {
  open: boolean;
  handleClose: () => void;
  user: IUserState;
}

interface PasswordModalData {
  currentPassword: string;
  newPassword: string;
}

export const ChangePasswordModal: FC<PasswordModalProps> = ({ open, handleClose, user }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [error, setError] = useState('');
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaPassword), mode: 'all' });

  const onSubmitHandlerPassword = (data: PasswordModalData): void => {
    setIsButtonDisabled(true);
    setError('');
    getMe().then((customerData) => {
      const { id, version } = customerData.body;

      updateCustomerPassword(data.currentPassword, data.newPassword, id, version)
        .then(() => {
          setIsButtonDisabled(false);
          setIsSuccess(true);

          setTimeout(() => {
            const flowData = {
              email: user.email,
              password: data.newPassword,
            };
            rootClient.updateWithPasswordFlow(flowData);
            getMe();

            handleClose();
            reset();
            setIsSuccess(false);
          }, 2000);
        })
        .catch((err) => {
          setIsButtonDisabled(false);
          if (err.code === 400) {
            setError('Current password is wrong!');
          } else setError('Whoops. Something went wrong!');
        });
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={styles.modal}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmitHandlerPassword)}>
          <Stack className={styles.inputs} spacing={4}>
            <CustomPasswordInput error={errors.currentPassword} register={register('currentPassword')} label='Current password' />
            <CustomPasswordInput error={errors.newPassword} register={register('newPassword')} label='New password' />
          </Stack>
          {error ? <Typography className={styles.serverError}>{error}</Typography> : null}
          {isSuccess ? <Typography className={styles.serverError}>Password changed!</Typography> : null}
          <Button disabled={isButtonDisabled} className={isButtonDisabled ? styles.button_disabled : styles.button} variant='contained' type='submit'>
            {isButtonDisabled ? '' : 'Save'}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};
