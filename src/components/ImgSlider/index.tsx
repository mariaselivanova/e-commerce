import React, { FC, useState } from 'react';
import { Stack } from '@mui/material';

import { Thumbnails } from './Thumbnails';
import styles from './ImgSlider.module.css';

export const ImgSlider: FC<{ images: string[]; handleOpenModal?: (arg0: number) => void; isModal?: boolean; imageStep?: number }> = ({
  images,
  handleOpenModal,
  isModal,
  imageStep,
}) => {
  const [activeStep, setActiveStep] = useState(!imageStep ? 0 : imageStep);
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
    <Stack className={isModal ? styles.imgSliderModal : styles.imgSlider}>
      <img
        src={images.at(activeStep)}
        onClick={isModal ? undefined : (): void => handleOpenModal && handleOpenModal(activeStep)}
        className={!isModal ? styles.productImage : ''}
      />
      {maxSteps > 1 && (
        <Thumbnails
          images={images}
          activeStep={activeStep}
          handleBack={handleBack}
          handleNext={handleNext}
          handleStep={handleStep}
          isModal={isModal}
        />
      )}
    </Stack>
  );
};
