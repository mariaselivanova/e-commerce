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

    const linkElement = screen.getByText(/Learn React/i);
    expect(linkElement).toBeInTheDocument();
  });
});
