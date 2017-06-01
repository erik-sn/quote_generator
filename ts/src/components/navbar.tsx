import * as Cookies from 'js-cookie';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { IReduxStore } from '../constants/interfaces';

export interface INavbarProps {
  username: string;
  token: string;
  path: string;
  logout: () => void;
}

/**
 * Compare the application path to the "to" prop on a
 * link. If they match add an extra class so the user
 * can have a highlight of which navbar item is "active"
 * @param {string} to - Link to property
 * @param {string} path - application browser path
 * @returns {string} - container's className
 */
function getClassName(to: string, path: string): string {
  const className = 'navbar__item';
  return to === path ? `${className} navbar__active` : className;
}

const Navbar = ({ path, logout, username, token }: INavbarProps) => {
  return (
    <div className="navbar__container" >
      <div id="navbar__left">
        <div className={getClassName('/', path)} >
          <Link to="/">Home</Link>
        </div>
        <div className={getClassName('/quotes', path)}>
          <Link to="/quotes">Quotes</Link>
        </div>
        <div className={getClassName('/login', path)}>
          {/*
            If a user is authenticated render a link to log
            them out, otherwise a link to redirec them to the
            login page
          */}
          {username
            ? <a href="#" onClick={logout}>Logout</a>
            : <Link id="navbar__login" to="/login">Login</Link>
          }
        </div>
      </div>
      <div id="navbar__right" className="navbar__item">
        <div id="navbar__user">{username || undefined}</div>
      </div>
    </div>
  );
};

export default Navbar;
