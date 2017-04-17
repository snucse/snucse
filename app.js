// Map, Set과 String.prototype.includes 등을 사용할 수 있게 함
import 'core-js/shim';

import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch} from 'react-router';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import './stylesheets/reset.css';
import './stylesheets/common.styl';

import {
  Menu,
  Others,
  Message,
  ProfileList,
  ProfileMake,
  ProfileAdmin,
  ProfileAdminTransfer,
  Main,
  Activity,
  TagInfo,
  ArticleWrite,
  ArticleEdit,
  SearchResult,
  ClassManager,
  Login,
  SignUp,
  Settings,
  TimeManager
} from './components';

import reducers from './reducers';

const rootElement = document.getElementById('content');
const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
  combineReducers({...reducers, routerReducer}),
  applyMiddleware(middleware)
);

const ProfileRoute = ({match}) => (
  <Switch>
    <Route exact path={`${match.url}`} component={ProfileList}/>
    <Route path={`${match.url}/new`} component={ProfileMake}/>
    <Route path={`${match.url}/:id/admin`} component={ProfileAdmin}/>
    <Route path={`${match.url}/:id/transfer_admin`} component={ProfileAdminTransfer}/>
    <Route path={`${match.url}/:id/write`} component={ArticleWrite}/>
  </Switch>
);

const MenuRoute = () => (
  <Menu>
    <Switch>
      <Route exact path="/" component={Main}/>
      <Route path="/message" component={Message}/>
      <Route path="/others" component={Others}/>
      <Route path="/profiles" component={ProfileRoute}/>
      <Route path="/search" component={SearchResult}/>
      <Route path="/settings" component={Settings}/>
      <Route path="/tags" component={TagInfo}/>
      <Route path="/activities" component={Activity}/>
      <Route path="/:articleId/edit" component={ArticleEdit}/>
      <Route exact path="/:id" component={ClassManager}/>
    </Switch>
  </Menu>
);

ReactDOM.render(
  <Provider store={store}>
    <TimeManager>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/sign-up" component={SignUp}/>
          <Route path="/" component={MenuRoute}/>
        </Switch>
      </ConnectedRouter>
    </TimeManager>
  </Provider>,
  rootElement
);
