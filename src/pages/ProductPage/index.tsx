import React, { FC, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Image } from '@commercetools/platform-sdk';

import { getCategoryByKey, getProductByKey } from '../../sdk/requests';
import { ImgSlider } from '../../components/ImgSlider';

interface IProduct {
  name: string;
  description?: string;
  urls: Image[] | undefined;
  price: string;
  discountedPrice?: string;
}

export const ProductPage: FC = () => {
  const { productKey } = useParams();
  const [product, setProduct] = useState<IProduct>({
    name: '',
    description: '',
    urls: undefined,
    price: '',
  });

  useEffect(() => {
    getProductByKey(productKey as string).then(({ body: { name, description, masterVariant, categories } }) => {
      const descriptionText = description ? description['en-US'] : '';
      console.log('priceees', masterVariant.prices);
      const priceObj = masterVariant.prices?.at(0);
      categories.map((categor) =>
        getCategoryByKey(categor.id).then((dataCategor) => {
          console.log(dataCategor);
        }),
      );

      const priceTag = `${(priceObj?.value.centAmount as number) / 100} ${priceObj?.value.currencyCode}`;
      const discountedPriceTag = priceObj?.discounted ? `${priceObj.discounted.value.centAmount / 100} ${priceObj.value.currencyCode}` : undefined;
      console.log(discountedPriceTag);

      setProduct({
        name: name['en-US'],
        description: descriptionText,
        urls: masterVariant.images,
        price: priceTag,
        discountedPrice: discountedPriceTag,
      });
    });
  }, [productKey]);

  console.log(product.urls);

  return (
    <Box>
      <ImgSlider imgs={product.urls} />
      <Typography variant='h5'>{}</Typography>
      <Typography variant='h4'>{product.name}</Typography>
      <Typography variant='h4' sx={product.discountedPrice ? { textDecoration: 'line-through' } : {}}>
        {product.price}
      </Typography>
      {product.discountedPrice ? (
        <Typography variant='h4' color='red'>
          {product.discountedPrice}
        </Typography>
      ) : undefined}
      <Typography variant='body1'>{product.description}</Typography>
    </Box>
  );
};
