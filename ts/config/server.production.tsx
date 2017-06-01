import * as process from 'process';
/* tslint:disable:no-var-requires object-literal-sort-keys */
delete process.env.BROWSER;

import * as compression from 'compression';
import * as express from 'express';
import * as http from 'http';
import * as logger from 'morgan';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
// import {  match, RouterContext } from 'react-router';
import { StaticRouter } from 'react-router-dom';
import { applyMiddleware, createStore, Store } from 'redux';

import Application from '../src/components/application';
import reducers from '../src/reducers/root_reducer';

let server: any;
const app = express(); // delcare application
const PORT = process.env.PORT || 3007;

app.use(compression()); // compress compatible files for quicker client load time
app.use(logger('dev')); // log content

// Set path to public assets
app.use('/maidbot/static', express.static('dist'));
app.use('/maidbot/dist', express.static('dist'));

/**
 * For every request send the URL to React Router The router will return the content that should be
 * delivered to the user. If the URL does not match any route, a 404 will be returned.
 *
 * React renders the component that should be returned in string format, and that string is served to the
 * client in an html form with static resources attached to it. After this page is loaded, any links o
 * routing that takes place will be handled purely by the javascript in react router.
 */
const context: any = {};
app.use('/', (req: any, res: any) => {
    const html = generateHtml(req);
    if (context.url) {
      res.writeHead(302, {
        Location: context.url,
      });
      res.end();
    } else {
      res.header('Content-Type', 'text/html; charset=utf-8');
      res.write(renderFullPage(html));
      res.end();
    }
});

function generateHtml(req: any): string {
  const createStoreWithMiddleware = applyMiddleware()(createStore);
  return renderToString(
    <Provider store={createStoreWithMiddleware(reducers)} >
      <StaticRouter location={req.url} context={context} >
        <Application />
      </StaticRouter>
    </Provider>,
  );
}

// create server based on application configuration
server = http.createServer(app);

// start the server listening on specified port
server.listen(PORT);

/**
 * Takes a react rendering in string format and returns a full html page.
 *
 * @param {string} html - react component to be rendered
 * @param {string} version - application version from package.json
 * @return {string} full html page
 */
function renderFullPage(html: string): string {
  return `
    <!doctype html>
    <html>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <head>
        <title>Quotes!</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
        <link rel="stylesheet" href="/maidbot/static/bundle.min.css">
        <link
          rel="icon"
          href="https://openclipart.org/image/2400px/svg_to_png/202309/open-quotations.png"
          type="image/x-icon"
        />
      </head>
      <body id="app-body">
        <div id="app-container">${html}</div>
      </body>
      <script src="/maidbot/static/bundle.min.js"></script>
    </html>
  `;
}
