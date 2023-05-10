import PropTypes from 'prop-types';
import './styles.css';

function Typography({ variant, children }) {
  return <p className={variant}>{children}</p>;
}

Typography.propTypes = {
  variant: PropTypes.string.isRequired,
  children: PropTypes.string,
};

export default Typography;
