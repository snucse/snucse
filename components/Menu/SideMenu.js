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
            <section id="following-profiles-box">
              <h5 id="following-profiles-title">팔로우 중인 프로필<Link id="all-profiles-link" to="/profiles">전체 프로필 보기</Link></h5>
              <FollowingProfileList/>
            </section>
            <TagCloud/>
          </aside>
        );

      default:
        return (
          <aside id="sidemenu-container"/>
        );
    }
  }
});

function mapStateToProps(state) {
  return {
    userLevel: state.userInfo.userLevel
  };
}

export default connect(mapStateToProps)(SideMenu);
