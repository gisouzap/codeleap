import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../index';

describe('Button', () => {
  it('should render button with correct label', () => {
    const { getByRole } = render(<Button label="Confirm" variant="primary" />);

    const button = getByRole('button');

    expect(button).toBeInTheDocument();
  });

  it('should call handleClick when the button is clicked', () => {
    const handleClick = jest.fn();

    const { getByRole } = render(
      <Button label="Confirm" onClick={handleClick} variant="primary" />
    );

    const button = getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should render and match the snapshot', () => {
    const { container } = render(<Button label="Confirm" variant="primary" />);

    expect(container).toMatchSnapshot();
  });
});
