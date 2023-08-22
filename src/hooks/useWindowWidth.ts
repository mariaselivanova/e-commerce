import { useState, useEffect } from 'react';

interface IWindowSize {
  windowWidth: number;
  isMobileScreen: boolean;
}

export const useWindowWidth = (): IWindowSize => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (): void => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return (): void => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobileScreen = windowWidth < 768;

  return { windowWidth, isMobileScreen };
};
