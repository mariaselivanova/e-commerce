// @ts-nocheck
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './app';

describe('App tests', () => {
  it('sanity check', () => {
    expect(1).toBe(1);
  });

  it('checks if message is there', () => {
    render(<App />);

    const linkElement = screen.getByText(/Here is our Main Page and test buttons and inputs/i);
    expect(linkElement).toBeInTheDocument();
  });
});
