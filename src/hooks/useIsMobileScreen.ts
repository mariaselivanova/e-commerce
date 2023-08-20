import { useState, useEffect } from 'react';

interface IWindowSize {
  windowWidth: number;
  isMobileScreen: boolean;
}

export function useWindowWidth(initialValue = 0): IWindowSize {
  const [windowWidth, setWindowWidth] = useState(initialValue);

  useEffect(() => {
    const handleResize = (): void => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return (): void => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobileScreen = windowWidth < 768;

  return { windowWidth, isMobileScreen };
}
