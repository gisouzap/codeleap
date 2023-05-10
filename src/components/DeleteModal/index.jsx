import { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import Typography from '../Typography';
import Button from '../Button';
import Card from '../Card';

import './styles.css';

function DeleteModal({ onDelete, onClose }) {
  const handleEscape = useCallback(
    event => {
      if (event.keyCode === 27) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEscape, false);
    return () => {
      document.removeEventListener('keydown', handleEscape, false);
    };
  }, [handleEscape]);

  return (
    <div className="modal">
      <Card style={{ width: '670px' }}>
        <Typography variant="title">
          Are you sure you want to delete this item?
        </Typography>

        <div className="buttons">
          <Button variant="light" onClick={onClose} label="Cancel" />
          <Button variant="danger" onClick={onDelete} label="Delete" />
        </div>
      </Card>
    </div>
  );
}

export default DeleteModal;

DeleteModal.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
