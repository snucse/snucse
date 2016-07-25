import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import Menu from './Menu.js';
import Others from './Others.js';
import Message from './Message.js';
import Group from './Group.js';
import Group_Post from './Group_Post.js';
import Main from './Main.js';
import Post_Write from './Post_Write.js';
import Edit from './Post_Edit.js';
import Post from './Post.js';

const rootElement = document.getElementById('content');

var Test = React.createClass({
    render: function() {
        return (
                <div>
                main
                </div>
               );
    }
});

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Menu} pollInterval={2000}>
            <IndexRoute component={Main} url="http://aws.izz.kr:3000/api/v1/articles" pollInterval={2000} />
            <Route path="/message" component={Message} />
            <Route path="/others" component={Others} />
            <Route path="/:post_id/edit" component={Edit} url="http://aws.izz.kr:3000/api/v1/articles" />
            <Route path="/group" component={Group} url="http://aws.izz.kr:3000/api/v1/groups" />
            <Route path="/group/:id" component={Group_Post} url="http://aws.izz.kr:3000/api/v1/articles">
                <IndexRoute component={Post} url="http://aws.izz.kr:3000/api/v1/articles" />
                <Route path="/group/:id/write" component={Post_Write} url="http://aws.izz.kr:3000/api/v1/articles"/>
            </Route>
        </Route>
    </Router>, 
    rootElement);
