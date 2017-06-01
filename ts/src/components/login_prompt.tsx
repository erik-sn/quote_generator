import * as React from 'react';
import { Link } from 'react-router-dom';

const LoginPrompt = () => (
  <div className="prompt__container" >
    <h2>Your need to {<Link to="/login">log in</Link>} to view quotes!</h2>
  </div>
);

export default LoginPrompt;
