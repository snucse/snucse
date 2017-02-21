import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {UserLevel} from '../../utils';
import TagCloud from '../TagCloud';
import FollowingProfileBox from '../FollowingProfileBox';

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
            <FollowingProfileBox showAllProfileLink/>
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
            <FollowingProfileBox/>
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
