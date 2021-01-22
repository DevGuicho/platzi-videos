/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import dotenv from 'dotenv';
import webpack from 'webpack';
import React from 'react';
import helmet from 'helmet';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import cookieParser from 'cookie-parser';
import boom from '@hapi/boom';
import passport from 'passport';
import axios from 'axios';
import { config } from './config';
import reducer from '../frontend/reducers';
/* import initialState from '../frontend/initialState'; */
import serverRoutes from '../frontend/routes/serverRoutes';
import Layout from '../frontend/components/Layout';
import getManifest from './getManifest';

dotenv.config();

const THIRTY_DAYS_IN_SEC = 2592000000;
const TWO_HOURS_IN_SEC = 7200000;
const { ENV, PORT } = process.env;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

require('./utils/auth/strategies/basic');

if (ENV === 'development') {
  console.log('Development config');
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const { publicPath } = webpackConfig.output;
  const serverConfig = { serverSideRender: true, publicPath };

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use((req, res, next) => {
    if (!req.hashManifest) req.hashManifest = getManifest();
    next();
  });
  app.use(express.static(`${__dirname}/public`));
  app.use(
    helmet.permittedCrossDomainPolicies({
      permittedPolicies: 'none',
    })
  );
  app.disable('x-powered-by');
}

const setResponse = (html, preloadedState, manifest) => {
  const mainStyles = manifest ? manifest['vendors.css'] : 'assets/app.css';
  const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js';
  const vendorBuild = manifest ? manifest['vendors.js'] : 'assets/vendor.js';

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href=${mainStyles} type="text/css"/> 
    <title>Platzi Videos</title>
  </head>
  <body>
    <div id="App">${html}</div>
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
        /</g,
        '\\u003c'
      )}
    </script>
    <script src=${mainBuild} type="text/javascript"></script>
    <script src=${vendorBuild} type="text/javascript"></script>
  </body>
  </html>
  `;
};

const renderApp = async (req, res) => {
  let initialState;
  const { token, email, name, id } = req.cookies;

  try {
    let movieList = await axios({
      url: `${config.apiUrl}/api/movies`,
      headers: { Authorization: `Bearer ${token}` },
      method: 'get',
    });
    movieList = movieList.data.data;
    initialState = {
      user: {
        id,
        email,
        name,
      },
      myList: [],
      trends: movieList.filter(
        (movie) => movie.contentRating === 'PG' && movie._id
      ),
      originals: movieList.filter(
        (movie) => movie.contentRating === 'G' && movie._id
      ),
    };
  } catch (err) {
    initialState = {
      user: {},
      myList: [],
      trends: [],
      originals: [],
    };
  }

  const store = createStore(reducer, initialState);
  const preloadedState = store.getState();
  const isLogged = initialState.user.id;
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        <Layout>{renderRoutes(serverRoutes(isLogged))}</Layout>
      </StaticRouter>
    </Provider>
  );

  res.send(setResponse(html, preloadedState, req.hashManifest));
};

app.post('/auth/sign-in', async (req, res, next) => {
  const { rememberMe } = req.body;

  passport.authenticate('basic', (error, data) => {
    try {
      if (error || !data) next(boom.unauthorized());

      req.login(data, { session: false }, async (err) => {
        if (err) next(err);
        const { token, ...user } = data;
        res.cookie('token', token, {
          httpOnly: !(ENV === 'development'),
          secure: !(ENV === 'development'),
          maxAge: rememberMe ? THIRTY_DAYS_IN_SEC : TWO_HOURS_IN_SEC,
        });
        res.status(200).json(user);
      });
    } catch (err) {
      next(err);
    }
  })(req, res, next);
});

app.post('/auth/sign-up', async (req, res, next) => {
  const { body: user } = req;
  try {
    const userData = await axios({
      url: `${config.apiUrl}/api/auth/sign-up`,
      method: 'post',
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
      },
    });
    res.status(201).json({
      name: req.body.name,
      email: req.body.email,
      id: userData.data.id,
    });
  } catch (error) {
    next(error);
  }
});

app.get('*', renderApp);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server on port ${PORT}`);
});
