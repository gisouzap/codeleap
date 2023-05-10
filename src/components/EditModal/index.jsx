import { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import Typography from '../Typography';
import TextField from '../TextField';

import Button from '../Button';
import Card from '../Card';

import './styles.css';

function EditModal({ post, onChange, onSave, onClose }) {
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

  if (!post) {
    return null;
  }

  return (
    <div className="modal">
      <Card style={{ width: '670px' }}>
        <div className="modal-wrapper">
          <Typography variant="title">Edit item</Typography>

          <div className="input-group">
            <Typography variant="label">Title</Typography>
            <TextField
              onChange={e => onChange({ title: e.target.value })}
              value={post.title}
            />
          </div>
          <div className="input-group">
            <Typography variant="label">Content</Typography>
            <textarea
              value={post.content}
              onChange={e => onChange({ content: e.target.value })}
              className="textarea"
            />
          </div>
        </div>
        <div className="buttons">
          <Button variant="light" onClick={onClose} label="Cancel" />
          <Button variant="success" onClick={onSave} label="Save" />
        </div>
      </Card>
    </div>
  );
}

export default EditModal;

EditModal.propTypes = {
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  post: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
  }),
};
