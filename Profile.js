import React from 'react';
import $ from 'jquery';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import fetch from 'whatwg-fetch'

var Profiles = React.createClass({
  loadProfilesFromServer: function() {
    fetch(this.props.router.url)
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
    var profiles = this.state.data.profiles.map((profile) => {
      return (
          <div key={profile.sid} className="profile">
            <strong onClick={this.Profiles(profile.sid)}>{profile.name}</strong>
          </div>
          );
    });

    return (
      <div className="profiles">
        {profiles}
      </div>
     );
  }
});

export default Profiles;
