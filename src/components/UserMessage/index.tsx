import React, { FC, ReactNode } from 'react';
import { Alert, AlertColor, Snackbar } from '@mui/material';

interface UserMessageProps {
  severity: AlertColor;
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}

export const UserMessage: FC<UserMessageProps> = ({ severity, children, open, onClose }) => (
  <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
    <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
      {children}
    </Alert>
  </Snackbar>
);
