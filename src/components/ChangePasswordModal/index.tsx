import { yupResolver } from '@hookform/resolvers/yup';
import { Modal, Box, Button } from '@mui/material';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { schemaPassword, SchemaTypePassword } from '../ProfileInfoModal/validationSchema';
import { CustomPasswordInput } from '../CustomPasswordInput';
import styles from './ChangePasswordModal.module.css';

interface PasswordModalProps {
  open: boolean;
  handleClose: () => void;
}

export const ChangePasswordModal: FC<PasswordModalProps> = ({ open, handleClose }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
  } = useForm({ resolver: yupResolver(schemaPassword), mode: 'all' });

  const onSubmitHandlerPassword = (data: SchemaTypePassword): void => {
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
        <Box className={styles.modal}>
          <form className={styles.form} onSubmit={handleSubmitPassword(onSubmitHandlerPassword)}>
            <CustomPasswordInput error={errorsPassword.password} register={registerPassword('password')} label='Password' />
            <Button disabled={isSuccess} className={styles.button} variant='contained' type='submit'>
              {isSuccess ? 'Password changed!' : 'Save'}
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};
