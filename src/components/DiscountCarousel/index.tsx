import React, { FC, useEffect, useState } from 'react';

import { DiscountCode } from '@commercetools/platform-sdk';
import { Tooltip, Button, Typography, Paper, MobileStepper, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import { useErrorHandling } from '../../hooks/useErrorHandling';
import { getDiscountCodes } from '../../sdk/requests';

import styles from './DiscountCarousel.module.css';

const promocodes = [
  {
    code: 'SILVER10',
    description:
      'Looking to save some money on your next purchase? Look no further than our 10% Off Everything discount! Looking to save some money on your next purchase? Look no further than our 10% Off Everything discount Looking to save some money on your next purchase? Look no further than our 10% Off Everything discount Looking to save some money on your next purchase? Look no further than our 10% Off Everything discount',
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

export const DiscountCarousel: FC = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const [copySuccess, setCopySuccess] = useState('Click to copy');
  const [description, setDescription] = useState('');
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([
    {
      id: '',
      code: '',
      version: 0,
      createdAt: '',
      lastModifiedAt: '',
      cartDiscounts: [],
      references: [],
      groups: [],
      isActive: false,
    },
  ]);
  const { handleError } = useErrorHandling();

  const maxSteps = discountCodes.length;

  useEffect(() => {
    getDiscountCodes()
      .then((data) => {
        setDiscountCodes(data.body.results.filter((e) => e.isActive));
      })
      .catch((err) => {
        handleError(err);
        setDescription('An error occured! Cannot get discount codes :(');
      });
  }, [handleError]);

  const copyToClipBoard = (): void => {
    try {
      navigator.clipboard.writeText(discountCodes[activeStep].code);
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

  const handleCodeBlur = (): void => {
    setTimeout(() => {
      setCopySuccess('Click to copy');
    }, 100);
  };

  return (
    <Box className={styles.box} display={!description ? 'initial' : 'none'}>
      <Tooltip onClose={handleCodeBlur} placement='top' title={copySuccess}>
        <Paper onClick={copyToClipBoard} square elevation={0} className={styles.header}>
          <Typography variant='h6' component='h6' className={styles.code}>
            {discountCodes[activeStep].code}
          </Typography>
        </Paper>
      </Tooltip>
      <Typography className={styles.main}>{promocodes[activeStep].description}</Typography>
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
