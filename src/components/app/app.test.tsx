import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './app';

test('renders BurgerConstructor menu item', () => {
  render(<App/>);
  const linkElement = screen.getByText(/Конструктор/i);
  expect(linkElement).toBeInTheDocument();
});
