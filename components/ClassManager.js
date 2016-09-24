import React from 'react';
import $ from 'jquery';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import Post from './Post.js';
import ProfilePost from './ProfilePost.js';

var ClassManager = React.createClass({
  render: function() {
    let {id} = this.props.params;
    var re = /^\d+&/

    if (re.test(id)) {
      return (
        <ProfilePost url={this.props.route.url} id={id} />
      );
//여기서 숫자로 받고 글 하나를 보여줘야함
    } else {
      return (
        <ProfilePost url={this.props.route.url} id={id} />
      );
    }
  }
});

export default ClassManager;
