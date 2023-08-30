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
import { FilterOptions } from '../../components/FilterOptions';

export const CatalogPage: FC = () => {
  const [productList, setProductList] = useState<ProductProjection[]>([]);
  const { errorState, closeError, handleError } = useErrorHandling();

  const { search } = useLocation();
  const categoryId = new URLSearchParams(search).get('category');
  const sortOptions = new URLSearchParams(search).get('sort');
  const filterOptions = new URLSearchParams(search).get('filter');

  useEffect(() => {
    closeError();
    const fetchData = async (): Promise<void> => {
      try {
        const {
          body: { results },
        } = await searchProducts(categoryId, sortOptions, filterOptions);
        setProductList(results);
      } catch (error) {
        handleError(error as Error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <>
      {errorState.isError && (
        <UserMessage severity='error' open={errorState.isError} onClose={closeError}>
          {errorState.errorMessage}
        </UserMessage>
      )}
      <CatalogMenu />
      <Stack spacing={2} direction='row' justifyContent='flex-end' width='80%' maxWidth='1200px'>
        <SortOptionsInput />
        <FilterOptions />
      </Stack>
      <ProductList productList={productList} categoryId={categoryId} />
    </>
  );
};
