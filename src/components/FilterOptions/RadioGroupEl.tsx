import React, { FC } from 'react';
import { Box, FormControl, FormControlLabel, IconButton, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import styles from './FilterOptions.module.css';

interface IRadioGroupElProps {
  value: string;
  handleReset: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options: string[];
  label: string;
}

export const RadioGroupEl: FC<IRadioGroupElProps> = ({ value, handleReset, onChange, options, label }) => (
  <Box>
    <Typography className={styles.label}>{label}:</Typography>
    <Stack direction='row' justifyContent='space-between'>
      <FormControl component='fieldset'>
        <RadioGroup className={styles.radioGroup} value={value} onChange={onChange}>
          {options.map((option) => (
            <FormControlLabel key={option} value={option} control={<Radio size='small' />} label={option} />
          ))}
        </RadioGroup>
      </FormControl>
      {value && (
        <IconButton onClick={handleReset}>
          <RemoveCircleIcon fontSize='small' />
        </IconButton>
      )}
    </Stack>
  </Box>
);
