import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import InnerHTML from 'dangerously-set-inner-html';
import classnames from 'classnames';

import {updateFollowingList, clearProfileDetail, loadProfileDetail, updateFollowingState} from '../actions/dispatchers';
import '../stylesheets/profile.styl';
import {UserLevel} from '../utils';

import {ProfileTagBox, ProfileCommentBox} from './boxes';
import Feed from './Feed';

const Profile = React.createClass({

  getInitialState() {
    return {
      isFolded: false
    };
  },

  handleFollowChanged(following) {
    this.props.updateFollowingState(this.props.id, following);
  },

  handleClickFoldButton() {
    this.setState({
      isFolded: true
    });
  },

  handleClickUnfoldButton() {
    this.setState({
      isFolded: false
    });
  },

  componentWillMount() {
    this.props.loadProfileDetail(this.props.id);
    this.setState({
      isFolded: this.props.following
    });
  },

  componentWillReceiveProps(props) {
    // 프로필이 바뀌었을 때만 다시 로드
    if (props.id !== this.props.id) {
      this.props.loadProfileDetail(props.id);
    }
    this.setState({
      isFolded: props.following
    });
  },

  shouldComponentUpdate(props, state) {
    return this.props.loading !== props.loading ||
      this.props.following !== props.following ||
      this.state.isFolded !== state.isFolded;
  },

  render() {
    const {loading, id, userId, admin, name, renderedDescription} = this.props;
    const mine = admin && userId === admin.id;

    if (loading) {
      return <p>Loading...</p>;
      // TODO insert loading component
    }
    if (!loading && !admin) {
      return null;
    }

    const profileNameClass = classnames({
      'profile-name-fold': this.state.isFolded,
      'profile-name-unfold': !this.state.isFolded
    });

    const activityButton = (
      <Link id="profile-activity-button" to={`/activities?profileId=${id}`}>활동</Link>
    );
    const rightButton = mine ? (
      <Link id="profile-admin-button" to={`/profiles/${id}/admin`}>프로필 설정</Link>
    ) : (
      <FollowBox userLevel={this.props.userLevel} following={this.props.following} onFollowChanged={this.handleFollowChanged}/>
    );
    const foldButton = this.state.isFolded ? (
      <button id="profile-unfold-button" title="대문 열기" onClick={this.handleClickUnfoldButton}>▼</button>
    ) : (
      <button id="profile-fold-button" title="대문 접기" onClick={this.handleClickFoldButton}>◀</button>
    );
    const profileMain = this.state.isFolded ? null : (
      <div id="profile-main">
        <InnerHTML id="profile-description" html={renderedDescription}/>
        <ProfileTagBox profileId={id}/>
        <ProfileCommentBox
          profileId={id}
          commentCount={this.props.commentCount}
          lastComment={this.props.lastComment}
          isAddable
          />
      </div>
    );

    return (
      <div>
        <div id="profile-information">
          {foldButton}
          {rightButton}
          {activityButton}
          <h3 id="profile-name" className={profileNameClass}>{name}</h3>
          {profileMain}
        </div>
        <Feed profileId={id}/>
      </div>
    );
  },

  componentWillUnmount() {
    this.props.clearProfileDetail();
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
  const {loading, following, name, description, renderedDescription, renderingMode, admin, commentCount, lastComment} = state.profile.current;
  const {userLevel, userId} = state.userInfo;
  return {
    loading,
    following,
    name,
    description,
    renderedDescription,
    renderingMode,
    admin,
    commentCount,
    lastComment,
    userLevel,
    userId
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    clearProfileDetail: () => clearProfileDetail(dispatch),
    loadProfileDetail: id => loadProfileDetail(dispatch, id),
    updateFollowingState: (id, following) => updateFollowingState(dispatch, id, following),
    updateFollowingList: () => updateFollowingList(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
