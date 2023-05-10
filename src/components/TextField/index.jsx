import './styles.css';

function TextField({ ...props }) {
  return <input type="text" {...props} className="input" />;
}

export default TextField;
