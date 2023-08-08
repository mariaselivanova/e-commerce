import React from 'react';
import logo from '../../logo.svg';
import styles from './app.module.css';
import { Button, Typography, TextField, Box } from '@mui/material';

function App() {
  return (
    <div className={styles.app}>
      <Typography variant='h3' gutterBottom>
        Here is our Main Page and test buttons and inputs
      </Typography>
      <Box component='form' noValidate autoComplete='off' className={styles.mainForm}>
        <TextField variant='outlined' id='no-error-input' label='No error' defaultValue='No error input' />
        <TextField variant='outlined' error id='error-input' label='Error' defaultValue='Error input' helperText='Incorrect entry.' />
        <Button variant='contained'>React cats</Button>
      </Box>
    </div>
  );
}

export default App;
