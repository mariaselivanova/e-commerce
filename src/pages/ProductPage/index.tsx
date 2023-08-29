import React, { FC, useEffect, useState } from 'react';
import { Stack, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';

import { getProductByKey } from '../../sdk/requests';
import { ImgSlider } from '../../components/ImgSlider';
import { useErrorHandling } from '../../hooks/useErrorHandling';

import { UserMessage } from '../../components/UserMessage';
import { PriceDisplay } from '../../components/PriceDisplay';

import fallbackImage from '../../assets/images/not-found.jpg';
import styles from './ProductPage.module.css';

interface IProduct {
  name: string;
  description?: string;
  urls: string[];
  price: number;
  discountedPrice?: number;
}

export const ProductPage: FC = () => {
  const { productKey } = useParams();
  const [product, setProduct] = useState<IProduct>({
    name: '',
    description: '',
    price: 0,
    urls: [fallbackImage],
  });
  const { errorState, closeError, handleError } = useErrorHandling();

  useEffect(() => {
    closeError();
    if (!productKey) {
      return;
    }

    getProductByKey(productKey)
      .then(({ body: { name, description, masterVariant } }) => {
        const descriptionText = description ? description['en-US'] : '';
        const priceObj = masterVariant.prices?.at(0);

        const priceTag = priceObj?.value.centAmount as number;
        const discountedPriceTag = priceObj?.discounted ? priceObj.discounted.value.centAmount : undefined;

        const imageUrls: string[] = [];

        if (masterVariant.images) {
          masterVariant.images.map((image) => imageUrls.push(image.url));
        } else {
          imageUrls.push(fallbackImage);
        }

        setProduct({
          name: name['en-US'],
          description: descriptionText,
          urls: imageUrls,
          price: priceTag,
          discountedPrice: discountedPriceTag,
        });
      })
      .catch(handleError);
    // eslint-disable-next-line
  }, [productKey]);

  return (
    <>
      {errorState.isError && (
        <UserMessage severity='error' open={errorState.isError} onClose={closeError}>
          {errorState.errorMessage}
        </UserMessage>
      )}
      <Stack direction={'row'} className={styles.productPage}>
        <ImgSlider images={product.urls} />
        <Stack className={styles.productPageTextBlock}>
          <Typography variant='h4'>{product.name}</Typography>
          <Stack direction={'row'} gap={'3%'}>
            <PriceDisplay initialPrice={product.price} discountedPrice={product.discountedPrice} />
          </Stack>
          <Button variant='contained' size='large' className={styles.addToCartBtn}>
            Add to cart
          </Button>
          <Typography variant='body1'>{product.description}</Typography>
        </Stack>
      </Stack>
    </>
  );
};
