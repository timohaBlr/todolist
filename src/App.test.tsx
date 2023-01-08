import React from 'react';
import { render } from '@testing-library/react';
import {AppContainer} from "./Components/AppContainer";

test('renders learn react link', () => {
  const { getByText } = render(<AppContainer />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
