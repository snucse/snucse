import React from 'react';
import {Link} from 'react-router';
import {DataCon} from '../utils';
import Post from './Post.js';

const ProfilePost = React.createClass({
  render() {
    const {id} = this.props;
    return (
      <div>
        <div className="menu_of_profile">
          <Link to={`/profile/${id}/write`}>글쓰기</Link>
          <FollowBox id={id} url={this.props.url}/>
        </div>
        <Post url={`${this.props.url}articles`} isProfile id={id}/>
      </div>
    );
  }
});

const FollowBox = React.createClass({
  checkFollow() {
    const {id} = this.props;
    const url = `${this.props.url}profiles/${id}`;
    DataCon.loadDataFromServer(url).then(data => {
      // TODO: data.following이 undefined일 수 있을까요?
      // 그렇다고 해도 이 코드는 작동하긴 합니다만...
      this.setState({followed: Boolean(data.following)});
    }).catch(console.error);
  },

  componentDidMount() {
    this.checkFollow();
  },

  handleFollow() {
    const {id} = this.props;
    if (confirm('팔로우 하시겠습니까?')) {
      const url = `${this.props.url}profiles/${id}/follow`;
      DataCon.postDataToServer(url, 'POST').catch(console.error);
    }
  },

  handleUnfollow() {
    const {id} = this.props;
    if (confirm('팔로우를 취소하시겠습니까?')) {
      const url = `${this.props.url}profiles/${id}/unfollow`;
      DataCon.postDataToServer(url, 'POST').catch(console.error);
    }
  },

  getInitialState() {
    return {
      followed: false
    };
  },

  render() {
    return this.state.followed ?
      <p onClick={this.handleUnfollow}>팔로우 취소</p> :
      <p onClick={this.handleFollow}>팔로우</p>;
  }
});

export default ProfilePost;
