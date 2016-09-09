import React from 'react';
import $ from 'jquery';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import fetch from 'whatwg-fetch'

var Profile = React.createClass({
  loadProfilesFromServer: function() {
    fetch('/profiles')
      .then((res) => {
        if(res.status >= 200 && res.status < 300)
          return res.json();
        else throw Error(res.statusText);
      }).then((data) => {
        this.setState({data: data});
      }).catch((error) => {});
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
    var groups = this.state.data.profiles.map((profile) => {
      return(
        <div key={profile.sid + profile.name} className="profiles">
          <strong onClick={this.Profiles(profile.sid)}>{profile.name}</strong>
        </div>
      );
    });

    return (
      <div>
        {profiles}
      </div>
     );
  }
});

export default Profile;
