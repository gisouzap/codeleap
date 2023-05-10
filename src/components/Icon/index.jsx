import PropTypes from 'prop-types';

import edit from './icons/edit.svg';
import trash from './icons/delete.svg';

function Icon({ name, ...props }) {
  const icons = { edit, trash };

  return <img src={icons[name]} {...props} />;
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
