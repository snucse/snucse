import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {updateFollowingList, loadProfileDetail, updateFollowingState} from '../actions/dispatchers';
import '../stylesheets/profile.styl';
import {UserLevel} from '../utils';

import {ProfileTagBox, ProfileCommentBox} from './boxes';
import Feed from './Feed';

const Profile = React.createClass({
  handleFollowChanged(following) {
    this.props.updateFollowingState(this.props.id, following);
  },

  componentWillMount() {
    this.props.loadProfileDetail(this.props.id);
  },

  componentWillReceiveProps(props) {
    // 프로필이 바뀌었을 때만 다시 로드
    if (props.id !== this.props.id) {
      this.props.loadProfileDetail(props.id);
    }
  },

  render() {
    const {loading, id, userId, admin, name, renderedDescription} = this.props;
    const mine = admin && userId === admin.id;
    const activityButton = (
      <Link id="profile-activity-button" to={`/activities?profileId=${id}`}>활동</Link>
    );
    const rightButton = mine ? (
      <Link id="profile-admin-button" to={`/profiles/${id}/admin`}>프로필 설정</Link>
    ) : (
      <FollowBox userLevel={this.props.userLevel} following={this.props.following} onFollowChanged={this.handleFollowChanged}/>
    );

    if (loading) {
      return <p>Loading...</p>;
      // TODO insert loading component
    }

    if (!loading && !admin) {
      return null;
    }

    return (
      <div>
        <div id="profile-information">
          {rightButton}
          {activityButton}
          <h3 id="profile-name">{name}</h3>
          <div id="profile-description" dangerouslySetInnerHTML={{__html: renderedDescription}}/>
          <ProfileTagBox profileId={id}/>
          <ProfileCommentBox
            profileId={id}
            commentCount={this.props.commentCount}
            lastComment={this.props.lastComment}
            isAddable
            />
        </div>
        <Feed profileId={id}/>
      </div>
    );
  }
});

const FollowBox = React.createClass({
  handleFollow() {
    this.props.onFollowChanged(true);
  },

  handleUnfollow() {
    this.props.onFollowChanged(false);
  },

  render() {
    switch (this.props.userLevel) {
      case UserLevel.REGULAR:
        return this.props.following ? (
          <button id="follow-button" onClick={this.handleUnfollow}>팔로우 취소</button>
        ) : (
          <button id="follow-button" onClick={this.handleFollow}>팔로우</button>
        );

      default:
        return null;
    }
  }
});

const mapStateToProps = function (state) {
  const {loading, following, name, description, renderedDescription, admin, commentCount, lastComment} = state.profile.current;
  const {userLevel, userId} = state.userInfo;
  return {
    loading,
    following,
    name,
    description,
    renderedDescription,
    admin,
    commentCount,
    lastComment,
    userLevel,
    userId
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    loadProfileDetail: id => loadProfileDetail(dispatch, id),
    updateFollowingState: (id, following) => updateFollowingState(dispatch, id, following),
    updateFollowingList: () => updateFollowingList(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
