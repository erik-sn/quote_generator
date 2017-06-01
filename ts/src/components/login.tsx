import * as axios from 'axios';
import * as Cookies from 'js-cookie';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { login, resetLoginErrors } from '../actions/index';
import { API } from '../constants/constants';
import { IAction, ILoginErrors, IReduxStore } from '../constants/interfaces';

import LoginField from './login_field';
import LoginSuccess from './login_success';

export interface ILoginProps extends RouteComponentProps<JSX.Element> {
  errors?: ILoginErrors;
  login?: (username: string, password: string) => IAction;
  resetLoginErrors?: () => IAction;
  token?: string;
  user?: string;
}

export interface ILoginState {
  [key: string]: any;  // this is required for our handleInputChange implementation
  password: string;
  username: string;
}

/**
 * Form to log in users. Field states are managed within the component,
 * authentication actions are taken in Redux actions, middleware and store
 */
export class Login extends React.Component<ILoginProps, ILoginState> {

  constructor(props: ILoginProps) {
    super(props);
    this.state = {
      password: '',
      username: '',
    };
  }

  public render(): JSX.Element {
    const { success, username, password } = this.state;
    const { errors, token, user } = this.props;
    return (
      <div className="login__container" >
        <form id="login__form" onSubmit={this.handleSubmitForm} >
          <section id="login__inputs">
            <LoginField
              label="Username"
              value={username}
              handleChange={this.handleInputChange}
              placeholder="e.g., erik"
              error={errors && errors.username ? errors.username[0] : undefined}
            />
            <LoginField
              label="Password"
              value={password}
              handleChange={this.handleInputChange}
              placeholder="e.g., ********"
              error={errors && errors.password ? errors.password[0] : undefined}
              password={true}
            />
            <div className="login__error login__error_large">
              {errors && errors.non_field_errors ? errors.non_field_errors[0] : undefined}
            </div>
          </section>
          <section id="login__buttons">
            <button
              id="login__submit"
              className="login__button"
              type="submit"
            >
              Submit
            </button>
            <button
              id="login__clear"
              className="login__button"
              onClick={this.handleClearForm}
              type="button"
            >
              Clear
            </button>
          </section>
        </form>
        {token ? <LoginSuccess username={user} /> : undefined}
      </div>
    );
  }

  /**
   * Update the state depending on which input field
   * the event is being sourced from
   */
  private handleInputChange = (event: React.FormEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  }

  private handleSubmitForm = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { password, username } = this.state;
    this.props.login(username, password);
  }

  private handleClearForm = (event: React.FormEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    this.setState({ username: '', password: '' }, () => (
      // errors are handled in the auth reducer
      // so we need to clear them with an action
      this.props.resetLoginErrors()
    ));
  }
}

function mapStateToProps(state: IReduxStore): {} {
  return { ...state.auth, user: state.auth.username };
}

export default connect<{}, {}, ILoginProps>(mapStateToProps, {
  login,
  resetLoginErrors,
})(Login);
