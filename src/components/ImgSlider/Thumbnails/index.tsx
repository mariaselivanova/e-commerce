import React, { FC } from 'react';
import { IconButton, Stack, Step, StepLabel } from '@mui/material';
import { Image } from '@commercetools/platform-sdk';

import styles from './Thumbnails.module.css';
import leftArrow from '../../../assets/icons/left-arrow.svg';
import rightArrow from '../../../assets/icons/right-arrow.svg';

interface IThumbnail {
  images: Image[] | undefined;
  onLeftClick: () => void;
  onRightClick: () => void;
  onThumbnailClick: (arg0: number) => void;
  currentStep: number;
}

export const Thumbnails: FC<IThumbnail> = ({
  images: imgs,
  onLeftClick: handleBack,
  onRightClick: handleNext,
  onThumbnailClick: handleStep,
  currentStep: activeStep,
}) => {
  console.log(imgs);
  return (
    <Stack direction={'row'} className={styles.thumbnail}>
      <IconButton onClick={handleBack} className={styles.iconButton}>
        <img src={leftArrow} alt='Left arrow' className={styles.arrowImg} />
      </IconButton>
      {imgs?.map((img, imgID) => (
        <Step key={img.url}>
          <StepLabel onClick={(): void => handleStep(imgID)}>
            <img src={img.url} className={activeStep === imgID ? styles.imgActiveDot : styles.imgDot} />
          </StepLabel>
        </Step>
      ))}

      <IconButton onClick={handleNext} className={styles.iconButton}>
        <img src={rightArrow} alt='Right arrow' className={styles.arrowImg} />
      </IconButton>
    </Stack>
  );
};
