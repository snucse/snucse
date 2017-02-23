import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {
  NormalFollowingProfileListItemContainer,
  StarFollowingProfileListItemContainer,
  TabFollowingProfileListItemContainer
} from './FollowingProfileListItemContainer';

const FollowingProfileBox = React.createClass({

  propTypes: {
    showAllProfileLink: React.PropTypes.bool
  },

  render() {
    const profiles = this.props.me.following.sort((a, b) => {
      if (a.tab !== undefined && b.tab !== undefined) {
        return a.tab - b.tab;
      } else if (a.tab !== undefined && b.tab == undefined) {
        return -1;
      } else if (a.tab == undefined && b.tab !== undefined) {
        return 1;
      } else if (a.star && !b.star) {
        return -1;
      } else if (!a.star && b.star) {
        return 1;
      }
      return 0;
    }).map(profile => {
      const itemView = profile.tab === undefined ? profile.star ? (
        <StarFollowingProfileListItemContainer key={`${profile.id}${profile.name}`} profile={profile}/>
      ) : (
        <NormalFollowingProfileListItemContainer key={`${profile.id}${profile.name}`} profile={profile}/>
      ) : (
        <TabFollowingProfileListItemContainer key={`${profile.id}${profile.name}`} profile={profile}/>
      );
      return itemView;
    });
    const allProfileLink = this.props.showAllProfileLink ?
      <Link id="all-profiles-link" to="/profiles">전체 프로필 보기</Link> :
      null;

    return (
      <section id="following-profiles-box">
        <h5 id="following-profiles-title">팔로우 중인 프로필{allProfileLink}</h5>
        <ul id="following-profiles-list">
          {profiles}
        </ul>
      </section>
    );
  }
});

const mapStateToProps = function (state) {
  return {
    me: state.me
  };
};

export default connect(mapStateToProps)(FollowingProfileBox);
