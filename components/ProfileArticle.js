import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {updateFollowingList, loadProfileTag} from '../actions/dispatchers';
import {loadProfileDetail, updateFollowingState} from '../actions/profileAction';
import {Url, DataCon} from '../utils';
import '../stylesheets/tagbox.styl';
import Article from './Article';
import {ProfileTagBox} from './TagBox';

const ProfileArticle = React.createClass({
  handleFollowChanged(following) {
    this.props.updateFollowingState(this.props.id, following);
  },

  componentDidMount() {
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
        <div className="menu-of-profile">
          <Link to={`/profiles/${id}/write`}>글쓰기</Link>
          <FollowBox following={this.props.following} onFollowChanged={this.handleFollowChanged}/>
          <ProfileTagBox profileId={id}/>
        </div>
        <Article isProfile id={id}/>
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
    return this.props.following ? (
      <p onClick={this.handleUnfollow}>팔로우 취소</p>
    ) : (
      <p onClick={this.handleFollow}>팔로우</p>
    );
  }
});

const mapStateToProps = function (state) {
  const {following} = state.profile.data;
  return {
    following
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    loadProfileDetail: id => {
      DataCon.loadDataFromServer(Url.getUrl(`profiles/${id}`)).then(data => {
        dispatch(loadProfileDetail(data));
        loadProfileTag(dispatch, data.id, data.tags);
      }).catch(console.error);
    },
    updateFollowingState: (id, following) => {
      const type = following ? 'follow' : 'unfollow';
      DataCon.postDataToServer(Url.getUrl(`profiles/${id}/${type}`), 'POST').then(() => {
        dispatch(updateFollowingState(following));
        updateFollowingList(dispatch);
      }).catch(console.error);
    },
    updateFollowingList: () => updateFollowingList(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileArticle);

