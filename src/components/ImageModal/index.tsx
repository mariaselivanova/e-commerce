import React, { FC } from 'react';
import { Modal } from '@mui/material';

import { ImageModalProps } from '../../utils/types';
import { ImgSlider } from '../ImgSlider';
import styles from './ImageModal.module.css';

export const ImageModal: FC<ImageModalProps> = ({ open, handleClose, images, imageStep }) => (
  <Modal open={open} onClose={handleClose} className={styles.modal}>
    <ImgSlider images={images} isModal={true} imageStep={imageStep} />
  </Modal>
);
