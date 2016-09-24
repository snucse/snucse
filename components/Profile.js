import React from 'react';
import $ from 'jquery';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import 'whatwg-fetch';
import ProfileForm from './ProfileMake.js';

var Profiles = React.createClass({
  loadProfilesFromServer: function() {
    fetch(this.props.route.url,{headers:{Authorization:'Token token='+localStorage.getItem('snucsesession')}})
      .then((res) => {
        return res.json();
      }).then((data) => {
        this.setState({data: data});
      }).catch((error) => {console.log(error);});
  },

  componentDidMount: function() {
    this.loadProfilesFromServer();
  },

  getInitialState: function() {
    return {data: {profiles: []}}
  },

  Profiles: function(sid) {
    browserHistory.push('/'+sid);
  },

  render: function() {
    var _this = this;
    var profiles = this.state.data.profiles.map(function(profile) {
      return (
          <div key={profile.sid} className="profile">
          <strong onClick={()=>_this.Profiles(profile.sid)}>{profile.name}</strong>
          </div>
          );
    });
    return (
        <div className="profile container">
          <ProfileForm url={this.props.route.url} />
          <div className="profiles">
            {profiles}
          </div>
        </div>
        );
  }
});

export default Profiles;
