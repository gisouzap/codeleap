import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Post from '../index';

describe('Post', () => {
  const username = 'codeleapUser';
  const item = {
    title: 'CodeLeap',
    content: 'Hello world',
    username: 'codeleapUser',
    created_datetime: '"2023-02-12T15:42:38.421Z"',
  };

  const handleDelete = jest.fn();
  const handleEdit = jest.fn();

  it('should render and match the snapshot', () => {
    const { container } = render(
      <Post
        username={username}
        item={item}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('should call handleEdit when delete button is clicked', () => {
    const { getByTitle } = render(
      <Post
        username={username}
        item={item}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    );

    const editBtn = getByTitle('Edit');

    fireEvent.click(editBtn);

    expect(handleEdit).toHaveBeenCalledTimes(1);
  });

  it('should call handleDelete when delete button is clicked', () => {
    const { getByTitle } = render(
      <Post
        username={username}
        item={item}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    );

    const deleteBtn = getByTitle('Delete');

    fireEvent.click(deleteBtn);

    expect(handleDelete).toHaveBeenCalledTimes(1);
  });
});
