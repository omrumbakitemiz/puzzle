import React from 'react';
import { render } from 'react-testing-library';
import Home from './Home';

it('renders home works message', () => {
  const { getByText } = render(<Home />);
  expect(getByText('Home works!')).toBeInTheDocument();
});
