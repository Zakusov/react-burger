import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './app';

test('renders AppHeader', () => {
  render(<App/>);
  const linkElement = screen.getByText(/AppHeader/i);
  expect(linkElement).toBeInTheDocument();
});
