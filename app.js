import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import {
  Menu,
  Others,
  Message,
  Profiles,
  Main,
  Tag,
  ArticleWrite,
  ArticleEdit,
  ClassManager,
  Login,
  SignUp
} from './components';

import reducers from './reducers';

import './base.styl';

const rootElement = document.getElementById('content');

const url = '/api/v1/';

const store = createStore(combineReducers(reducers));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/login" component={Login}/>
      <Route path="/sign-up" component={SignUp}/>
      <Route path="/" component={Menu} pollInterval={2000} url={url}>
        <IndexRoute component={Main} url={`${url}articles`} pollInterval={2000}/>
        <Route path="tags/:tagName" component={Tag}/>
        <Route path="message" component={Message}/>
        <Route path="others" component={Others}/>
        <Route path="profiles" component={Profiles} url={`${url}profiles`}/>
        <Route path="profiles/:id/write" component={ArticleWrite} url={`${url}articles`}/>
        <Route path=":id" component={ClassManager} url={url}/>
        <Route path=":articleId/edit" component={ArticleEdit} url={`${url}articles`}/>
      </Route>
    </Router>
  </Provider>,
  rootElement
);
