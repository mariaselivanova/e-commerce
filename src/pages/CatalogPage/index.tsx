import React, { FC, useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';

import { getProductsProjections } from '../../sdk/requests';
import { useErrorHandling } from '../../hooks/useErrorHandling';

import { UserMessage } from '../../components/UserMessage';
import { ProductList } from '../../components/ProductList';

export const CatalogPage: FC = () => {
  const [productList, setProductList] = useState<ProductProjection[]>([]);

  const { errorState, closeError, handleError } = useErrorHandling();

  useEffect(() => {
    closeError();
    getProductsProjections()
      .then((data) => setProductList(data.body.results))
      .catch(handleError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
