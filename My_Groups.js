import React from 'react';
import $ from 'jquery';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import DataCon from './Util.js';

var MyGroup = React.createClass({
  loadGroupfromServer: function() {
    var url = this.props.url;
    var success = function(data) {
      this.setState({data: data});
    }.bind(this);
    DataCon.loadDataFromServer(url, success);
  },

  getInitialState: function() {
    return {data: {profiles:[]}}
  },

  componentDidMount: function() {
    setInterval(this.loadGroupfromServer, 2000);
  },

  render: function() {
    var _this = this;
    console.log(this.state);
    var groups = this.state.data.profiles.map(function(group) {
      return (
        <li key={group.id+group.name}><Link to={"/"+group.id}>{group.name}</Link></li>
      );
    });

    return (
      <ul>
        {groups}
      </ul>
    );
  }
});

export default MyGroup;
