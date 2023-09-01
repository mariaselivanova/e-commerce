import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React, { FC } from 'react';

import styles from './FilterOptions.module.css';

interface IRadioGroup {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options: string[];
  label: string;
}

export const RadioGroupEl: FC<IRadioGroup> = ({ value, onChange, options, label }) => (
  <Box>
    <Typography>{label}:</Typography>
    <FormControl component='fieldset'>
      <RadioGroup className={styles.radioGroup} value={value} onChange={onChange}>
        {options.map((option) => (
          <FormControlLabel key={option} value={option} control={<Radio size='small' />} label={option} />
        ))}
      </RadioGroup>
    </FormControl>
  </Box>
);
