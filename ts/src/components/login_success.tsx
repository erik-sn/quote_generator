import * as React from 'react';
import { Redirect } from 'react-router-dom';

export interface ILoginSuccessProps {
  username: string;
}

export interface IState {
  redirect: boolean;
}

// ms to pause for
const PAUSE_TIME = 2000;

/**
 * Display a message to the user that they are logged in, pause
 * and then render a Redirect to the home page
 */
class LoginSuccess extends React.Component<ILoginSuccessProps, IState> {

  constructor(props: ILoginSuccessProps) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  public render(): JSX.Element {
    const { username } = this.props;
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login_success__container" >
        <h3>Welcome, {username} you have been successfully logged in, redirecting you to the home page</h3>
      </div>
    );
  }

  private componentDidMount(): void {
    setTimeout(() => {
      this.setState({ redirect: true });
    }, PAUSE_TIME);
  }

}

export default LoginSuccess;
