import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {loadAllProfiles} from '../actions/dispatchers';
import {UserLevel} from '../utils';
import ProfileMakeForm from './ProfileMakeForm';

const ProfileList = React.createClass({
  componentDidMount() {
    if (this.props.userLevel === UserLevel.REGULAR) {
      this.props.loadAllProfiles();
    }
  },

  render() {
    switch (this.props.userLevel) {
      case UserLevel.REGULAR: {
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

      default:
        return (
          <div className="profile-container">
            <p>준회원은 전체 프로필을 조회할 수 없습니다.</p>
          </div>
        );
    }
  }
});

const mapStateToProps = function (state) {
  return {
    userLevel: state.userInfo.userLevel,
    profileList: state.profile.allProfiles
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    loadAllProfiles: () => loadAllProfiles(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileList);
