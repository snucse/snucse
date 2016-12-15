import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {updateFollowingList, loadProfileDetail, updateFollowingState} from '../actions/dispatchers';
import '../stylesheets/tagbox.styl';
import {UserLevel} from '../utils';
import ArticleList from './ArticleList';
import {ProfileTagBox, ProfileBox, ProfileCommentBox} from './boxes';

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
    const {id} = this.props;
    return (
      <div>
        <div className="profile-detail">
          <ProfileBox id={id}/>
        </div>
        <div className="menu-of-profile">
          <Link to={`/profiles/${id}/write`}>글쓰기</Link>
          <FollowBox userLevel={this.props.userLevel} following={this.props.following} onFollowChanged={this.handleFollowChanged}/>
          <ProfileTagBox profileId={id}/>
          <ProfileCommentBox profileId={id} isAddable/>
        </div>
        <ArticleList id={id}/>
      </div>
    );
  }
});

const FollowBox = React.createClass({
  handleFollow() {
    if (confirm('팔로우 하시겠습니까?')) {
      this.props.onFollowChanged(true);
    }
  },

  handleUnfollow() {
    if (confirm('팔로우를 취소하시겠습니까?')) {
      this.props.onFollowChanged(false);
    }
  },

  render() {
    switch (this.props.userLevel) {
      case UserLevel.REGULAR:
        return this.props.following ? (
          <p onClick={this.handleUnfollow}>팔로우 취소</p>
        ) : (
          <p onClick={this.handleFollow}>팔로우</p>
        );

      default:
        return null;
    }
  }
});

const mapStateToProps = function (state) {
  const {following} = state.profile.current;
  const {userLevel} = state.userInfo;
  return {
    following,
    userLevel
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
