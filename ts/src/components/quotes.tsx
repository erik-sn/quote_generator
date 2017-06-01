import * as axios from 'axios';
import * as Cookies from 'js-cookie';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { API } from '../constants/constants';
import { IQuote } from '../constants/interfaces';

import Prompt from './login_prompt';

export interface IQuotesProps {
  token: string;
}

export interface IQuotesState {
  activeQuote: IQuote;
  error: string;
}

const promptForQuote = (
  <div className="quote__active">
    <h2>Click the button to get a quote!</h2>
  </div>
);

class Quotes extends React.Component<IQuotesProps, IQuotesState> {

  constructor(props: IQuotesProps) {
    super(props);
    this.state = {
      activeQuote: undefined,
      error: '',
    };
  }

  public render(): JSX.Element {
    const { activeQuote, error } = this.state;
    const { token } = this.props;
    return (
      <div id="quotes__outer">
        <div className="quotes__container" >
          {token && activeQuote
            ? <div className="quote__active">
                <div id="quote__text" >
                  <h3>
                    <span className="quote__marker">"</span>
                    {activeQuote.text}
                    <span className="quote__marker">"</span>
                  </h3>
                </div>
                <div id="quote__author">
                  <span className="quote__marker">-</span>
                  {/* Quote API sets the author as title - kept here to be
                  consistent.*/}
                  <span className="quote__author_text">{activeQuote.title}</span>
                </div>
              </div>
            : token ? promptForQuote : undefined
          }
          {token ? <button onClick={this.fetchQuote}>Get A New Quote</button> : <Prompt />}
          <div className="quotes__error">
            <h3>{error}</h3>
          </div>
        </div>
      </div>
    );
  }

  private fetchQuote = () => {
    const tokenString = Cookies.get('auth');
    if (!tokenString) {
      this.setState({ error: 'You need to login to get a quote'});
      return;
    }

    axios.get(`${API}/quotes/`)
    .then((response: any) => {
      const quote = response.data as IQuote;
      this.setState({ activeQuote: quote, error: '' });
    })
    .catch((error: any) => {
      const keys = Object.keys(error.response.data);
      this.setState({
        activeQuote: undefined,
        error: error.response.data[keys[0]],
      });
    });
  }
}

export default Quotes;
