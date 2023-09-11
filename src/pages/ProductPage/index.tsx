import React, { FC, useEffect, useState, useContext } from 'react';
import { Stack, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';

import { getProductByKey, addItemToCart, getCartById } from '../../sdk/requests';
import { ImgSlider } from '../../components/ImgSlider';
import { useErrorHandling } from '../../hooks/useErrorHandling';
import { UserContext } from '../../contexts/userContext';

import { UserMessage } from '../../components/UserMessage';
import { PriceDisplay } from '../../components/PriceDisplay';
import { ImageModal } from '../../components/ImageModal';
import { IProduct } from '../../utils/types';

import fallbackImage from '../../assets/images/not-found.jpg';
import styles from './ProductPage.module.css';

export const ProductPage: FC = () => {
  const { productKey } = useParams();
  const [product, setProduct] = useState<IProduct>({
    name: '',
    description: '',
    price: 0,
    urls: [fallbackImage],
    id: '',
  });
  const { errorState, closeError, handleError } = useErrorHandling();

  const user = useContext(UserContext);

  const [openModal, setOpenModal] = useState(false);
  const [imageStep, setImageStep] = useState(0);

  const handleOpenModal = (arg0: number): void => {
    setOpenModal(true);
    setImageStep(arg0);
  };
  const handleCloseModal = (): void => setOpenModal(false);

  useEffect(() => {
    closeError();
    if (!productKey) {
      return;
    }

    getProductByKey(productKey)
      .then(({ body: { name, description, masterVariant, id } }) => {
        const descriptionText = description ? description['en-US'] : '';
        const priceObj = masterVariant.prices?.at(0);

        const priceTag = priceObj?.value.centAmount as number;
        const discountedPriceTag = priceObj?.discounted ? priceObj.discounted.value.centAmount : undefined;

        const imageUrls: string[] = masterVariant.images ? masterVariant.images.map((image) => image.url) : [fallbackImage];

        setProduct({
          name: name['en-US'],
          description: descriptionText,
          urls: imageUrls,
          price: priceTag,
          discountedPrice: discountedPriceTag,
          id,
        });
      })
      .catch(handleError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productKey]);

  const handleAddProduct = (): void => {
    getCartById(user.cart)
      .then(({ body: { id, version } }) => {
        addItemToCart(id, version, product.id);
      })
      .catch(handleError);
  };

  return (
    <>
      {errorState.isError && (
        <UserMessage severity='error' open={errorState.isError} onClose={closeError}>
          {errorState.errorMessage}
        </UserMessage>
      )}
      <ImageModal open={openModal} handleClose={handleCloseModal} images={product.urls} imageStep={imageStep} />
      <Stack direction='row' className={styles.productPage}>
        <ImgSlider images={product.urls} handleOpenModal={handleOpenModal} />
        <Stack className={styles.productPageTextBlock}>
          <Typography variant='h4'>{product.name}</Typography>
          <Stack direction='row' gap='3%'>
            <PriceDisplay initialPrice={product.price} discountedPrice={product.discountedPrice} size='large' />
          </Stack>
          <Button variant='contained' size='large' className={styles.addToCartBtn} onClick={handleAddProduct}>
            Add to cart
          </Button>
          <Typography variant='body1'>{product.description}</Typography>
        </Stack>
      </Stack>
    </>
  );
};
