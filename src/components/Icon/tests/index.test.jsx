import React from 'react';
import { render } from '@testing-library/react';
import Icon from '../index';

describe('Icon', () => {
  it('should render and match the snapshot', () => {
    const spy = jest.spyOn(global.console, 'error');

    const { container } = render(<Icon name="edit" title="Edit" />);

    expect(container).toMatchSnapshot();
    expect(spy).not.toHaveBeenCalled();
  });
});
