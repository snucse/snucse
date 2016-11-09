import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {loadAllProfiles} from '../actions/dispatchers';
import ProfileMakeForm from './ProfileMakeForm';

const ProfileList = React.createClass({
  componentDidMount() {
    this.props.loadAllProfiles();
  },

  render() {
    const profileList = this.props.profileList.map(profile => {
      return (
        <div key={profile.id} className="profile">
          <Link to={`/${profile.id}`}>{profile.name}</Link>
        </div>
      );
    });
    return (
      <div className="profile-container">
        <ProfileMakeForm/>
        <div className="profiles">
          {profileList}
        </div>
      </div>
    );
  }
});

const mapStateToProps = function (state) {
  return {
    profileList: state.profile.allProfiles
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    loadAllProfiles: () => loadAllProfiles(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileList);
