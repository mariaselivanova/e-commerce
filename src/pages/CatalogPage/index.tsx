import React, { FC, useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { useLocation } from 'react-router-dom';

import { useErrorHandling } from '../../hooks/useErrorHandling';
import { getProductsByCategory, getProductsProjections } from '../../sdk/requests';

import { UserMessage } from '../../components/UserMessage';
import { ProductList } from '../../components/ProductList';

export const CatalogPage: FC = () => {
  const [productList, setProductList] = useState<ProductProjection[]>([]);
  const { errorState, closeError, handleError } = useErrorHandling();
  const location = useLocation();
  const categoryId = new URLSearchParams(location.search).get('category');

  useEffect(() => {
    closeError();
    const fetchData = async (): Promise<void> => {
      try {
        const { body } = categoryId ? await getProductsByCategory(categoryId) : await getProductsProjections();
        setProductList(body.results);
      } catch (error) {
        handleError(error as Error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  return (
    <>
      {errorState.isError && (
        <UserMessage severity='error' open={errorState.isError} onClose={closeError}>
          {errorState.errorMessage}
        </UserMessage>
      )}
      <ProductList productList={productList} />
    </>
  );
};
