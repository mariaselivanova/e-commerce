import { useState } from 'react';

interface IErrorState {
  isError: boolean;
  errorMessage: string;
}

interface IErrorHandlingResult {
  errorState: IErrorState;
  closeError: () => void;
  handleError: (error: Error) => void;
}

export const useErrorHandling = (): IErrorHandlingResult => {
  const [errorState, setErrorState] = useState<IErrorState>({
    isError: false,
    errorMessage: '',
  });

  const closeError = (): void => setErrorState({ isError: false, errorMessage: '' });

  const handleError = (error: Error): void => setErrorState({ isError: true, errorMessage: error.message });

  return { errorState, closeError, handleError };
};
