import { TextField } from '@mui/material';
import React, { FC, useState } from 'react';

interface emailProps {
  email: string;
}

const RegInput: FC<emailProps> = (props) => {
  const [textInputValue, setTextInputValue] = useState('');
  const [numberInputValue, setNumberInputValue] = useState('');

  const handleInputChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    console.log(input.value);
  };

  return (
    <div>
      <TextField
        value={textInputValue}
        // onChange={handleInputChange}
        type={'email'}
        id='input-email'
        label='E-mail'
      />
    </div>
  );
};

export default RegInput;
