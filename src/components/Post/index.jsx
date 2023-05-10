import PropTypes from 'prop-types';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Icon from '../Icon';
import Typography from '../Typography';

import './styles.css';

dayjs.extend(relativeTime);

function Post({ username, item, onDelete, onEdit }) {
  const time = dayjs(item.created_datetime).fromNow();

  return (
    <div className="post">
      <div className="post-header">
        <Typography variant="title">{item.title}</Typography>

        {username === item.username && (
          <div className="post-icons">
            <button type="button" onClick={onDelete} className="post-icon">
              <Icon name="trash" title="Delete" />
            </button>
            <button type="button" onClick={onEdit} className="post-icon">
              <Icon name="edit" title="Edit" />
            </button>
          </div>
        )}
      </div>
      <div className="post-wrapper">
        <div className="post-details">
          <Typography variant="bodyBold">{item.username}</Typography>
          <Typography variant="body">{time}</Typography>
        </div>

        <div className="post-content">
          <Typography variant="body">{item.content}</Typography>
        </div>
      </div>
    </div>
  );
}

export default Post;

Post.propTypes = {
  username: PropTypes.string,
  item: PropTypes.shape({
    title: PropTypes.string,
    username: PropTypes.string,
    content: PropTypes.string,
    id: PropTypes.number,
    created_datetime: PropTypes.string.isRequired,
  }),
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
