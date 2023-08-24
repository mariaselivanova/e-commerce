import React, { FC, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import { getCategoryByKey, getProductByKey } from '../../sdk/requests';

interface IProduct {
  name: string;
  description?: string;
  urls: string[];
  price: string;
}

export const ProductPage: FC = () => {
  const { productKey } = useParams();
  const [product, setProduct] = useState<IProduct>({
    name: '',
    description: '',
    urls: [],
    price: '',
  });

  useEffect(() => {
    getProductByKey(productKey as string).then(({ body: { name, description, masterVariant, categories } }) => {
      const descriptionText = description ? description['en-US'] : '';
      const imgsUrls = [''];
      const priceObj = masterVariant.prices?.at(0)?.value;
      console.log(categories);
      categories.map((categor) =>
        getCategoryByKey(categor.id).then((dataCategor) => {
          console.log(dataCategor);
        }),
      );

      const priceTag = `${(priceObj?.centAmount as number) / 100} ${priceObj?.currencyCode}`;

      masterVariant.images?.map((img) => imgsUrls.push(img.url));
      setProduct({ name: name['en-US'], description: descriptionText, urls: imgsUrls, price: priceTag });
    });
  }, [productKey]);

  return (
    <Box>
      <img src={product.urls[1]} />
      <Typography variant='h5'>{}</Typography>
      <Typography variant='h4'>
        {product.name} {product.price}
      </Typography>
      <Typography variant='body1'>{product.description}</Typography>
    </Box>
  );
};
