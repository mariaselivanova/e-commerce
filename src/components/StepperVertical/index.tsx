import React, { FC, useState } from 'react';
import { Avatar, Box, Button, Chip, Paper, Stack, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material';
import styles from './StepperVertical.module.css';

export const StepperVertical: FC = () => {
  const steps = [
    {
      label: 'Sprint #1',
      tasks: [
        {
          task: 'Task board setup',
          author: 'danuta',
          description:
            'The hardest part is the start. We had to start somewhere. So we started from the beginning. We created a task board to help us track our proggress and plan our actions.',
        },
        {
          task: 'Repository setup',
          author: 'maria',
          description: 'Then we had to create and configure a Github repo for comfortable development',
        },
        {
          task: 'Set up scripts',
          author: 'maria',
          description:
            'We had to set up necessary scripts and modules for out project... Luckily, we had wonderful team and a great mentor to help us out!',
        },
        {
          task: 'Husky, jest and testing',
          author: 'pavel',
          description: "Testing is also important. So we had to make sure the process will go safe and smooth and pushed code won't break anything",
        },
        {
          task: 'Comprehensive readMe',
          author: 'danuta',
          description: 'Clear description helps to deliver necessary details to any user that stumble across this project.',
        },
        {
          task: 'Commercetools project and API setup',
          author: 'maria',
          description: 'In this sprint we also had to make sure commercetools api is ready for work as well.',
        },
      ],
    },
    {
      label: 'Sprint #2',
      tasks: [
        {
          task: '404 page',
          author: 'danuta',
          description: '404 error page is necessary when user tries to access unavaliable or missing page',
        },
        {
          task: 'Do this',
          author: 'maria',
          description: '',
        },
        {
          task: 'Do that',
          author: 'danuta',
          description: '',
        },
      ],
    },
    {
      label: 'Sprint #3',

      tasks: [
        {
          task: 'Set up scripts',
          author: 'maria',
          description: '',
        },
        {
          task: '404 page',
          author: 'danuta',
          description: '',
        },
      ],
    },
    {
      label: 'Sprint #4',

      tasks: [
        {
          task: 'Set up scripts',
          author: 'maria',
          description: '',
        },
        {
          task: '404 page',
          author: 'danuta',
          description: '',
        },
      ],
    },
  ];

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
  return (
    <Box className={styles.box}>
      <Stepper variant='outlined' activeStep={activeStep} orientation='vertical'>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>
              <Typography variant='h5' component='h5'>
                {step.label}
              </Typography>
            </StepLabel>
            <StepContent>
              {step.tasks.map((e) => (
                <Stack className={styles.taskStack} key={e.task} direction={'row'}>
                  <Chip className={styles.taskChip} color='primary' variant='filled' label={e.task} /> —
                  <Avatar className={styles[e.author]}>{e.author.charAt(0).toUpperCase()}</Avatar> —{' '}
                  <Typography className={styles.taskDesc}>{e.description}</Typography>
                </Stack>
              ))}
              <Box sx={{ mb: 2, mt: 10 }}>
                <div>
                  <Button variant='contained' onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Begin anew!
          </Button>
        </Paper>
      )}
    </Box>
  );
};
