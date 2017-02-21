import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {loadAllProfiles} from '../../actions/dispatchers';
import {UserLevel} from '../../utils';

import '../../stylesheets/profile-list.styl';

const ProfileList = React.createClass({
  componentDidMount() {
    if (this.props.userLevel === UserLevel.REGULAR) {
      this.props.loadAllProfiles();
    }
  },

  componentWillReceiveProps(props) {
    if (this.props.userLevel !== props.userLevel && props.userLevel === UserLevel.REGULAR) {
      this.props.loadAllProfiles();
    }
  },

  render() {
    switch (this.props.userLevel) {
      case UserLevel.REGULAR: {
        const profileList = this.props.profileList.map(profile => {
          return (
            <li className="profile-list-item" key={profile.id}>
              <Link to={`/${profile.id}`}>{profile.name}</Link>
            </li>
          );
        });
        return (
          <div>
            <div id="profile-list-box">
              <h5 id="profile-list-title">
                전체 프로필 목록
                <Link id="profile-new-page-link" to="/profiles/new">
                  새 프로필 만들기
                </Link>
              </h5>
              <ul id="profile-list">
                {profileList}
              </ul>
            </div>
          </div>
        );
      }

      case UserLevel.ASSOCIATE:
        return (
          <div className="profile-container">
            <p>준회원은 전체 프로필을 조회할 수 없습니다.</p>
          </div>
        );

      default:
        return (
          <div className="profile-container">
            <p>Loading...</p>
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
