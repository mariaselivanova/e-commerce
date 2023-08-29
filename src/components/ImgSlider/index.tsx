import React, { FC } from 'react';
import { Stack } from '@mui/material';

import { Thumbnails } from './Thumbnails';
import styles from './ImgSlider.module.css';

export const ImgSlider: FC<{ images: string[] }> = ({ images }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = (): void => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep + 1 === maxSteps) {
        return 0;
      }
      return prevActiveStep + 1;
    });
  };

  const handleBack = (): void => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep - 1 < 0) {
        return maxSteps - 1;
      }
      return prevActiveStep - 1;
    });
  };

  const handleStep = (index: number): void => {
    setActiveStep(index);
  };

  return (
    <Stack className={styles.imgSlider}>
      <img src={images.at(activeStep)} />
      {maxSteps > 1 ? (
        <Thumbnails images={images} activeStep={activeStep} handleBack={handleBack} handleNext={handleNext} handleStep={handleStep} />
      ) : (
        ''
      )}
    </Stack>
  );
};
