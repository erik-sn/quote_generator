import * as cookie from 'js-cookie';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { logout, refreshUser } from '../actions/index';
import { IAction, IReduxStore } from '../constants/interfaces';
import Home from './home';
import Login from './login';
import Navbar from './navbar';
import Quotes from './quotes';

export interface IApplicationProps {
  path: string;
  username: string;
  token: string;
  logout: () => void;
  refreshUser?: (username: string, token: string) => IAction;
}

class Application extends React.Component<IApplicationProps, {}> {

  public render() {
    const { username, token, path, logout } = this.props;
    const childProps = { username, token };
    return (
      <div className="application-container">
        <Navbar {...{ username, token, logout, path }} />
        <Switch>
          <Route exact={true} path="/" render={() => <Home username={username} /> } />
          <Route path="/quotes" render={() => <Quotes token={token} />} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    );
  }

  /**
   * handle case where user refreshes page - fetch
   * the cookie and cycle it back through authentication
   */
  private componentWillMount(): void {
    const authCookieString = cookie.get('auth');
    if (authCookieString) {
      const { username, token } = JSON.parse(authCookieString);
      this.props.refreshUser(username, token);
    }
  }
}

function mapStateToProps(state: IReduxStore): {} {
  const router = state.router.location;
  return {
    ...state.auth,
    // router will be undefined on server side rendering
    path: router ? router.pathname : '/',
  };
}

const connectedApplication = connect<{}, {}, IApplicationProps>(mapStateToProps, {
  logout,
  refreshUser,
})(Application);

export default withRouter(connectedApplication as any);
