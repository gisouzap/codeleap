import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditModal from '../index';

describe('EditModal', () => {
  const handleSave = jest.fn();
  const handleChange = jest.fn();
  const handleClose = jest.fn();

  const post = {
    title: 'CodeLeap',
    content: 'Hello world',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    render(
      <EditModal
        post={post}
        onChange={handleChange}
        onSave={handleSave}
        onClose={handleClose}
      />
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('should call handleClose when ESC key is pressed', () => {
    const { container } = render(
      <EditModal
        post={post}
        onChange={handleChange}
        onSave={handleSave}
        onClose={handleClose}
      />
    );

    fireEvent.keyDown(container.querySelector('.modal'), { keyCode: 27 });

    expect(handleClose).toHaveBeenCalled();
  });

  it('should not call handleClose when other key is pressed', () => {
    const { container } = render(
      <EditModal
        post={post}
        onChange={handleChange}
        onSave={handleSave}
        onClose={handleClose}
      />
    );

    fireEvent.keyDown(container.querySelector('.modal'), { keyCode: 25 });

    expect(handleClose).not.toHaveBeenCalled();
  });

  it('should call handleChange with new title', () => {
    const { getAllByRole } = render(
      <EditModal
        post={post}
        onChange={handleChange}
        onSave={handleSave}
        onClose={handleClose}
      />
    );

    const input = getAllByRole('textbox')[0];

    fireEvent.change(input, { target: { value: 'New value' } });

    expect(handleChange).toHaveBeenCalledWith({ title: 'New value' });
  });

  it('should call handleChange with new content', () => {
    const { getAllByRole } = render(
      <EditModal
        post={post}
        onChange={handleChange}
        onSave={handleSave}
        onClose={handleClose}
      />
    );

    const textarea = getAllByRole('textbox')[1];

    fireEvent.change(textarea, { target: { value: 'New content' } });

    expect(handleChange).toHaveBeenCalledWith({ content: 'New content' });
  });

  it('should call handleSave when save button is clicked', () => {
    render(
      <EditModal
        post={post}
        onChange={handleChange}
        onSave={handleSave}
        onClose={handleClose}
      />
    );

    const saveBtn = screen.getByRole('button', { name: /save/i });

    fireEvent.click(saveBtn);

    expect(handleSave).toHaveBeenCalledTimes(1);
  });

  it('should render and match the snapshot equal null', () => {
    const { container } = render(
      <EditModal
        onChange={handleChange}
        onSave={handleSave}
        onClose={handleClose}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('should render and match the snapshot', () => {
    const { container } = render(
      <EditModal
        post={post}
        onChange={handleChange}
        onSave={handleSave}
        onClose={handleClose}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
