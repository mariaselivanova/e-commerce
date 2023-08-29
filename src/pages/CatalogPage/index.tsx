/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { useLocation } from 'react-router-dom';

import { Stack } from '@mui/material';
import { useErrorHandling } from '../../hooks/useErrorHandling';
import { searchProducts } from '../../sdk/requests';

import { UserMessage } from '../../components/UserMessage';
import { ProductList } from '../../components/ProductList';
import { CatalogMenu } from '../../components/CatalogMenu';
import { SortOptionsInput } from '../../components/SortOptionsInput';

export const CatalogPage: FC = () => {
  const [productList, setProductList] = useState<ProductProjection[]>([]);
  const { errorState, closeError, handleError } = useErrorHandling();
  const location = useLocation();
  const categoryId = new URLSearchParams(location.search).get('category');
  const sortOptions = new URLSearchParams(location.search).get('sort');

  useEffect(() => {
    closeError();
    const fetchData = async (): Promise<void> => {
      try {
        let response;

        if (sortOptions) {
          response = categoryId ? await searchProducts(categoryId, sortOptions) : await searchProducts(undefined, sortOptions);
        } else {
          response = categoryId ? await searchProducts(categoryId) : await searchProducts();
        }

        setProductList(response.body.results);
      } catch (error) {
        handleError(error as Error);
      }
    };
    fetchData();
  }, [categoryId, sortOptions]);

  return (
    <>
      {errorState.isError && (
        <UserMessage severity='error' open={errorState.isError} onClose={closeError}>
          {errorState.errorMessage}
        </UserMessage>
      )}
      <CatalogMenu />
      <Stack spacing={2} direction='row' width={'80%'} maxWidth={'1250px'}>
        <SortOptionsInput />
      </Stack>

      <ProductList productList={productList} categoryId={categoryId} />
    </>
  );
};
