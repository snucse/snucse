// Map, Set과 String.prototype.includes 등을 사용할 수 있게 함
import 'core-js/shim';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import './stylesheets/common.styl';

import {
  Menu,
  Others,
  Message,
  ProfileList,
  ProfileAdmin,
  ProfileAdminTransfer,
  Main,
  TagInfo,
  ArticleWrite,
  ArticleEdit,
  ClassManager,
  Login,
  SignUp,
  Settings
} from './components';

import reducers from './reducers';

const rootElement = document.getElementById('content');

const store = createStore(combineReducers(reducers));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/login" component={Login}/>
      <Route path="/sign-up" component={SignUp}/>
      <Route path="/" component={Menu} pollInterval={2000}>
        <IndexRoute component={Main} pollInterval={2000}/>
        <Route path="tags/:tagName" component={TagInfo}/>
        <Route path="message" component={Message}/>
        <Route path="others" component={Others}/>
        <Route path="profiles" component={ProfileList}/>
        <Route path="profiles/:id/write" component={ArticleWrite}/>
        <Route path="settings" component={Settings}/>
        <Route path="profiles/:id/admin" component={ProfileAdmin}/>
        <Route path="profiles/:id/transfer_admin" component={ProfileAdminTransfer}/>
        <Route path=":id" component={ClassManager}/>
        <Route path=":articleId/edit" component={ArticleEdit}/>
      </Route>
    </Router>
  </Provider>,
  rootElement
);
