import React from 'react';
import { render } from '@testing-library/react';
import Card from '../index';

describe('Card', () => {
  it('should render card with correct children', () => {
    const { getByText } = render(
      <Card>
        <span>Hello world</span>
      </Card>
    );

    const text = getByText('Hello world');

    expect(text).toBeInTheDocument();
  });

  it('should render and match the snapshot', () => {
    const { container } = render(
      <Card>
        <span>Hello world</span>
      </Card>
    );

    expect(container).toMatchSnapshot();
  });
});
