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
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get('category');

  useEffect(() => {
    closeError();
    if (categoryId) {
      getProductsByCategory(categoryId)
        .then((data) => setProductList(data.body.results))
        .catch(handleError);
    } else {
      getProductsProjections()
        .then((data) => setProductList(data.body.results))
        .catch(handleError);
    }
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
