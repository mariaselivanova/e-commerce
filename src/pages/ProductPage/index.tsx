import React, { FC, useEffect, useState } from 'react';
import { Stack, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Image } from '@commercetools/platform-sdk';

import { getCategoryByKey, getProductByKey } from '../../sdk/requests';
import { ImgSlider } from '../../components/ImgSlider';
import { useErrorHandling } from '../../hooks/useErrorHandling';

import { UserMessage } from '../../components/UserMessage';
import { PriceDisplay } from '../../components/PriceDisplay';

import styles from './ProductPage.module.css';

interface IProduct {
  name: string;
  description?: string;
  urls?: Image[];
  price: number;
  discountedPrice?: number;
}

export const ProductPage: FC = () => {
  const { productKey } = useParams();
  const [product, setProduct] = useState<IProduct>({
    name: '',
    description: '',
    price: 0,
  });
  const { errorState, closeError, handleError } = useErrorHandling();

  useEffect(() => {
    closeError();
    if (!productKey) {
      return;
    }

    getProductByKey(productKey)
      .then(({ body: { name, description, masterVariant, categories } }) => {
        const descriptionText = description ? description['en-US'] : '';
        console.log('priceees', masterVariant.prices);
        const priceObj = masterVariant.prices?.at(0);
        categories.map((categor) =>
          getCategoryByKey(categor.id).then((dataCategor) => {
            console.log(dataCategor);
          }),
        );

        const priceTag = priceObj?.value.centAmount as number;
        const discountedPriceTag = priceObj?.discounted ? priceObj.discounted.value.centAmount : undefined;
        console.log(discountedPriceTag);

        setProduct({
          name: name['en-US'],
          description: descriptionText,
          urls: masterVariant.images,
          price: priceTag,
          discountedPrice: discountedPriceTag,
        });
      })
      .catch(handleError);
  }, [productKey]);

  return (
    <>
      {errorState.isError && (
        <UserMessage severity='error' open={errorState.isError} onClose={closeError}>
          {errorState.errorMessage}
        </UserMessage>
      )}
      <Stack direction={'row'} className={styles.productPage}>
        <ImgSlider imgs={product.urls} />
        <Stack className={styles.productPageTextBlock}>
          <Typography variant='h5'>{'Main category > category'}</Typography>
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
