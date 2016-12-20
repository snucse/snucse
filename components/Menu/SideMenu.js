import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {UserLevel} from '../../utils';
import TagCloud from '../TagCloud';
import FollowingProfileList from './FollowingProfileList';

const SideMenu = React.createClass({
  render() {
    switch (this.props.userLevel) {
      case UserLevel.REGULAR:
        return (
          <aside id="sidemenu-container">
            <section id="user-box">
              <img id="user-image" src={this.props.profileImage}/>
              <h5 id="user-name">{this.props.name} ({this.props.username}) <Link id="settings-link" to="/settings">수정</Link></h5>
            </section>
            <section id="following-profiles-box">
              <h5 id="following-profiles-title">팔로우 중인 프로필<Link id="all-profiles-link" to="/profiles">전체 프로필 보기</Link></h5>
              <FollowingProfileList/>
            </section>
            <TagCloud/>
          </aside>
        );

      default:
        return (
          <aside id="sidemenu-container">
            <section id="user-box">
              <img id="user-image" src={this.props.profileImage}/>
              <h5 id="user-name">{this.props.name} ({this.props.username}) <Link id="settings-link" to="/settings">수정</Link></h5>
            </section>
            <section id="following-profiles-box">
              <h5 id="following-profiles-title">팔로우 중인 프로필</h5>
              <FollowingProfileList/>
            </section>
            <TagCloud/>
          </aside>
        );
    }
  }
});

function mapStateToProps(state) {
  return {
    userLevel: state.userInfo.userLevel,
    name: state.userInfo.name,
    username: state.userInfo.username,
    profileImage: state.userInfo.profileImageUri
  };
}

export default connect(mapStateToProps)(SideMenu);
