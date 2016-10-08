import React from 'react';
import $ from 'jquery';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import ProfileForm from './ProfileMake.js';
import DataCon from '../utils/DataCon.js';
import { connect } from 'react-redux';
import { loadProfiles } from '../actions/profilesAction';

var Profiles = React.createClass({
  loadProfilesFromServer: function() {
    DataCon.loadDataFromServer(this.props.route.url)
      .then(this.props.onProfilesLoad)
      .catch(console.error);
  },

  componentDidMount: function() {
    this.loadProfilesFromServer();
  },

  toProfiles: function(sid) {
    browserHistory.push('/'+sid);
  },

  render: function() {
    let profiles = this.props.data.profiles.map((profile) => {
      return (
          <div key={profile.sid} className="profile">
          <strong onClick={()=>this.toProfiles(profile.sid)}>{profile.name}</strong>
          </div>
          );
    });
    return (
        <div className="profile-container">
         <ProfileForm url={this.props.route.url} />
          <div className="profiles">
            {profiles}
          </div>
        </div>
        );
  }
});

let mapStateToProps = function(state) {
  return {
    data: state.profileList.data,
  };
}

let mapDispatchToProps = function(dispatch) {
  return {
    onProfilesLoad: (data) => { dispatch(loadProfiles(data)) },
  };
}

Profiles = connect(mapStateToProps, mapDispatchToProps)(Profiles);

export default Profiles;
