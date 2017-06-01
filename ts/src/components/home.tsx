import * as Cookies from 'js-cookie';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';

import { IReduxStore } from '../constants/interfaces';

export interface IHomeProps {
  username: string;
}

const loginPrompt = (
  <h3>
    Please <Link to="/login" >log in</Link> to 
    see all of the available features</h3>
);

const quotePrompt = (
  <h3>You can get random quotes <Link to="/quotes">here</Link></h3>
);

/** Welcome page - prompt for user to login or visit /quotes */
const Home = ({ username }: IHomeProps) =>  {
  const userString = username ? `, ${username}` : '';
  return (
    <div className="home__container" >
      <h2>Welcome to Quote Generator{userString || ''}</h2>
      {!username ? loginPrompt : quotePrompt}
    </div>
  );
};

export default Home;
