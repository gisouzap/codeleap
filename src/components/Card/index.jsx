import PropTypes from 'prop-types';
import './styles.css';

function Card({ children, ...props }) {
  return (
    <div className="card" {...props}>
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node,
};

export default Card;
