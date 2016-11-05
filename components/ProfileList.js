import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {loadProfileList} from '../actions/dispatchers';
import ProfileMakeForm from './ProfileMakeForm';

const ProfileList = React.createClass({
  componentDidMount() {
    this.props.loadProfileList();
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
    profileList: state.profileList.profileList
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    loadProfileList: () => loadProfileList(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileList);
