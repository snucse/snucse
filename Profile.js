import React from 'react';
import $ from 'jquery';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

var Profile = React.createClass({
  componentDidMount: function() {
    //var w = new WebSocket("ws://aws.izz.kr:3000/");

  },

  render: function() {
    //var w = new WebSocket("ws://aws.izz.kr:3000/");
    /*w.onmessage = function(event) {
      console.log(event);
    };*/
    return (
      <div>
        <h1>프로필</h1>
      </div>
    );
  }
});

export default Profile;
