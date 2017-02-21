import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

const FollowingProfileBox = React.createClass({

  propTypes: {
    showAllProfileLink: React.PropTypes.bool
  },

  render() {
    const profiles = this.props.me.following.map(profile => {
      return (
        <li key={`${profile.id}${profile.name}`}><Link to={`/${profile.id}`}>{profile.name}</Link></li>
      );
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
