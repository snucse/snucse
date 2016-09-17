import React from 'react';
import $ from 'jquery';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import Post from './Post.js';

var Main = React.createClass({
  render: function() {
    return (
      <div className="posts">
        <Post url={this.props.route.url} />
      </div>
    );
  }
});

export default Main;
