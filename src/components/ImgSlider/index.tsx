import React, { FC } from 'react';
import { Stack } from '@mui/material';
import { Image } from '@commercetools/platform-sdk';

import { Thumbnails } from './Thumbnails';
import styles from './ImgSlider.module.css';

export const ImgSlider: FC<{ imgs: Image[] | undefined }> = ({ imgs }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = imgs?.length as number;

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
      <img src={imgs?.at(activeStep)?.url} />

      <Thumbnails images={imgs} currentStep={activeStep} onLeftClick={handleBack} onRightClick={handleNext} onThumbnailClick={handleStep} />
    </Stack>
  );
};
