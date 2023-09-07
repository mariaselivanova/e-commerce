import React, { FC, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Tooltip } from '@mui/material';
import styles from './DiscountCarousel.module.css';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const promocodes = [
  {
    code: 'SILVER10',
    description: 'Looking to save some money on your next purchase? Look no further than our 10% Off Everything discount!',
  },
  {
    code: 'GOLDEN20',
    description: 'Get ready to treat yourself this holiday season with the this exclusive 20% discount, available for a short time!',
  },
  {
    code: 'PLATINUM35',
    description: 'Mindblowing discount for our beloved customers! Use this 35% off discount code for your next purchase!',
  },
  {
    code: 'DIAMOND50',
    description: 'Now this is just straight up robbery! 50% off to any product in our shop, dont waste this opportunity!',
  },
];

// const codesPlaceholder = [
//   {
//     code: 'Whoops!',
//     description: 'Seems like there are no active promocodes for the momemnt. More coming soon!',
//   },
// ];

export const DiscountCarousel: FC = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = promocodes.length;

  const [copySuccess, setCopySuccess] = useState('Click to copy');

  const copyToClipBoard = (): void => {
    try {
      navigator.clipboard.writeText(promocodes[activeStep].code);
      setCopySuccess('Copied!');
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };

  const handleNext = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number): void => {
    setActiveStep(step);
  };

  const handleCodeBlur = (): void => {
    setTimeout(() => {
      setCopySuccess('Click to copy');
    }, 100);
  };

  return (
    <Box className={styles.box}>
      <Tooltip onClose={handleCodeBlur} placement='top' title={copySuccess}>
        <Paper onClick={copyToClipBoard} square elevation={0} className={styles.header}>
          <Typography variant='h6' component='h6' className={styles.code}>
            {promocodes[activeStep].code}
          </Typography>
        </Paper>
      </Tooltip>
      <AutoPlaySwipeableViews
        interval={7000}
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {promocodes.map((step, index) => (
          <div key={step.code}>{Math.abs(activeStep - index) <= 2 ? <Typography className={styles.main}>{step.description}</Typography> : null}</div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        className={styles.footer}
        steps={maxSteps}
        position='static'
        activeStep={activeStep}
        nextButton={
          <Button size='small' onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size='small' onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </Box>
  );
};
