import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';

import apiEndpoint from '../../../apiEndpoint';

import Button from '../../components/Button';
import Card from '../../components/Card';
import TextField from '../../components/TextField';
import Post from '../../components/Post';
import Typography from '../../components/Typography';
import DeleteModal from '../../components/DeleteModal';
import EditModal from '../../components/EditModal';

import { loadPosts, logout } from '../../actions';
import {
  selectPosts,
  selectUsername,
  selectIsLoggedIn,
} from '../../actions/selectors';

import './styles.css';

function Home() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const username = useSelector(selectUsername);

  const blankPost = {
    username,
    title: '',
    content: '',
  };

  const [items, setItems] = useState([]);
  const [post, setPost] = useState(blankPost);
  const [currentPost, setCurrentPost] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [nextPage, setNextPage] = useState();

  const handleLogout = () => dispatch(logout());
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleCloseRemoveModal = () => setShowDeleteModal(false);

  const handleDelete = item => {
    setCurrentPost(item);
    setShowDeleteModal(true);
  };

  const handleEdit = item => {
    setCurrentPost(item);
    setShowEditModal(true);
  };

  const deletePost = async () => {
    try {
      await axios.delete(`${apiEndpoint}${currentPost.id}/`);
      await getPosts();
    } catch (error) {
      console.error(error);
    }

    handleCloseRemoveModal();
    toast.success('Post removed with success!');
  };

  const editPost = async () => {
    try {
      await axios.patch(`${apiEndpoint}${currentPost.id}/`, currentPost);
      await getPosts();
    } catch (error) {
      console.error(error);
    }

    handleCloseEditModal();
    toast.success('Post edited with success!');
  };

  const getPosts = async () => {
    try {
      const response = await axios.get(apiEndpoint);
      dispatch(loadPosts(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const createPost = async () => {
    try {
      await axios.post(apiEndpoint, post);
      await getPosts();
    } catch (error) {
      console.error(error);
      toast.success('Error!');
    }

    setPost(blankPost);
    toast.success('Post created!');
  };

  const getNextPosts = async () => {
    try {
      const response = await axios.get(nextPage);
      setItems([...items, ...response.data.results]);
      setNextPage(response.data.next);
    } catch (error) {
      console.error(error);
    }
  };

  const handleScroll = e => {
    const isAtBottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

    if (isAtBottom) {
      getNextPosts();
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (posts) {
      setItems(posts.results);
      setNextPage(posts.next);
    }
  }, [posts]);

  return (
    <div className="home">
      <div className="home-wrapper">
        <div className="home-header">
          <Typography variant="title">CodeLeap Network</Typography>
          <button onClick={handleLogout} className="button-logout">
            <Typography variant="label">Logout</Typography>
          </button>
        </div>

        <Card>
          <div className="form">
            <Typography variant="title">What’s on your mind?</Typography>
            <div>
              <Typography variant="label">Title</Typography>
              <TextField
                onChange={e => setPost({ ...post, title: e.target.value })}
                value={post.title}
              />
            </div>
            <div>
              <Typography variant="label">Content</Typography>
              <textarea
                value={post.content}
                onChange={e => setPost({ ...post, content: e.target.value })}
                className="textarea"
              />
            </div>
            <div className="button-create">
              <Button
                label="create"
                variant="primary"
                onClick={createPost}
                disabled={
                  /^\s*$/.test(post.title) || /^\s*$/.test(post.content)
                }
              />
            </div>
          </div>
        </Card>

        <div
          className="posts"
          data-testid="scroll-element"
          onScroll={handleScroll}
        >
          {items?.map(item => (
            <Post
              item={item}
              key={item.id}
              onDelete={() => handleDelete(item)}
              onEdit={() => handleEdit(item)}
              username={username}
            />
          ))}
        </div>
      </div>

      {showDeleteModal &&
        createPortal(
          <DeleteModal
            onClose={() => setShowDeleteModal(false)}
            onDelete={deletePost}
          />,
          document.body
        )}

      {showEditModal &&
        createPortal(
          <EditModal
            onClose={() => setShowEditModal(false)}
            onSave={editPost}
            onChange={value => setCurrentPost({ ...currentPost, ...value })}
            post={currentPost}
          />,
          document.body
        )}
    </div>
  );
}

export default Home;
