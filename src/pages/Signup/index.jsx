import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveUsername, login } from '../../actions';

import Button from '../../components/Button';
import Card from '../../components/Card';
import Typography from '../../components/Typography';
import TextField from '../../components/TextField';

import './styles.css';

function Signup() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');

  const handleLogin = () => {
    dispatch(saveUsername(username));
    dispatch(login());
  };

  return (
    <div className="signup">
      <div className="signup-wrapper">
        <Card>
          <Typography variant="title">Welcome to CodeLeap network!</Typography>

          <div className="card-input">
            <Typography variant="label">Please enter your username</Typography>
            <TextField
              placeholder="John doe"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>

          <div className="card-button">
            <Button
              label="Enter"
              variant="primary"
              disabled={!username.trim() || /^\s*$/.test(username)}
              onClick={handleLogin}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
