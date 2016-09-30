import React from 'react';
import $ from 'jquery';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import { DataCon } from '../utils';

var MyProfile = React.createClass({
  loadProfilefromServer: function() {
    var url = this.props.url;
    DataCon.loadDataFromServer(url).then(data => {
      this.setState({data});
    }).catch(console.error);
  },

  getInitialState: function() {
    return {data: {profiles:[]}}
  },

  componentDidMount: function() {
    this.loadProfilefromServer();
  },

  render: function() {
    var _this = this;
    var profiles = this.state.data.profiles.map(function(profile) {
      return (
        <li key={profile.id+profile.name}><Link to={"/"+profile.id}>{profile.name}</Link></li>
      );
    });

    return (
      <ul>
        {profiles}
      </ul>
    );
  }
});

export default MyProfile;
