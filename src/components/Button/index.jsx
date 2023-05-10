import PropTypes from 'prop-types';
import './styles.css';

function Button({ label, variant, disabled, ...props }) {
  return (
    <button
      type="button"
      disabled={disabled}
      {...props}
      className={`button ${variant}`}
    >
      {label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  variant: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Button;
