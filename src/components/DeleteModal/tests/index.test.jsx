import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeleteModel from '../index';

describe('DeleteModel', () => {
  it('should not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    const handleDelete = jest.fn();
    const handleClose = jest.fn();

    render(<DeleteModel onDelete={handleDelete} onClose={handleClose} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should call handleClose when close button is clicked ', () => {
    const handleDelete = jest.fn();
    const handleClose = jest.fn();

    render(<DeleteModel onDelete={handleDelete} onClose={handleClose} />);

    const closeBtn = screen.getByRole('button', { name: /cancel/i });

    fireEvent.click(closeBtn);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should call handleDelete when delete button is clicked ', () => {
    const handleDelete = jest.fn();
    const handleClose = jest.fn();

    render(<DeleteModel onDelete={handleDelete} onClose={handleClose} />);

    const deleteBtn = screen.getByRole('button', { name: /delete/i });

    fireEvent.click(deleteBtn);

    expect(handleDelete).toHaveBeenCalledTimes(1);
  });

  it('should call handleClose when ESC key is pressed', () => {
    const handleDelete = jest.fn();
    const handleClose = jest.fn();

    const { container } = render(
      <DeleteModel onDelete={handleDelete} onClose={handleClose} />
    );

    fireEvent.keyDown(container.querySelector('.modal'), { keyCode: 27 });

    expect(handleClose).toHaveBeenCalled();
  });

  it('should not call handleClose when other key is pressed', () => {
    const handleDelete = jest.fn();
    const handleClose = jest.fn();

    const { container } = render(
      <DeleteModel onDelete={handleDelete} onClose={handleClose} />
    );

    fireEvent.keyDown(container.querySelector('.modal'), { keyCode: 25 });

    expect(handleClose).not.toHaveBeenCalled();
  });

  it('should render and match the snapshot', () => {
    const handleDelete = jest.fn();
    const handleClose = jest.fn();

    const { container } = render(
      <DeleteModel onDelete={handleDelete} onClose={handleClose} />
    );

    expect(container).toMatchSnapshot();
  });
});
