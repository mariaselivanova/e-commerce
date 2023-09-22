import React, { FC, useState } from 'react';

import { Avatar, Box, Button, Chip, Paper, Stack, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material';

import { STEPS } from './steps';
import styles from './StepperVertical.module.css';

export const StepperVertical: FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = (): void => {
    setActiveStep(0);
  };

  const handleSetStep = (index: number): void => {
    setActiveStep(index);
  };

  return (
    <Box className={styles.box}>
      <Stepper variant='outlined' activeStep={activeStep} orientation='vertical'>
        {STEPS.map((step, index) => (
          <Step key={step.label}>
            <StepLabel onClick={(): void => handleSetStep(index)} sx={{ cursor: 'pointer' }}>
              <Typography variant='h5' component='h5'>
                {step.label}
              </Typography>
            </StepLabel>
            <StepContent>
              {step.tasks.map(({ task, author, description }) => (
                <Stack className={styles.taskStack} key={task} direction={'row'}>
                  <Chip className={styles.taskChip} color='primary' variant='filled' label={task} /> —
                  <Avatar className={styles[author]}>{author.charAt(0).toUpperCase()}</Avatar> —{' '}
                  <Typography className={styles.taskDesc}>{description}</Typography>
                </Stack>
              ))}
              <Box className={styles.buttons} sx={{ mb: 2, mt: 10 }}>
                <div>
                  <Button variant='contained' onClick={handleNext} sx={{ mr: 1 }}>
                    {index === STEPS.length - 1 ? 'Finish!' : 'Continue'}
                  </Button>
                  <Button variant='outlined' disabled={index === 0} onClick={handleBack}>
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === STEPS.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography className={styles.endCredit} variant='h5' component='h5'>
            Thus the Universe of Sparkle was born! Thank you for coming throughout this journey with us!
          </Typography>
          <Button color='primary' variant='contained' onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Begin anew!
          </Button>
        </Paper>
      )}
    </Box>
  );
};
