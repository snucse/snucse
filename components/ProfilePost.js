import React from 'react';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import { DataCon } from '../utils';
import Post from './Post.js';

var ProfilePost = React.createClass({
  render: function() {
    var id = this.props.id;
    return (
      <div>
        <div className="menu_of_profile">
          <Link to={"/profile/"+id+"/write"}>글쓰기</Link>
          <FollowBox id={id} url={this.props.url} />
        </div>
        <Post url={this.props.url+"articles"} is_profile={true} id={id}/>
      </div>
    );
  }
});

var FollowBox = React.createClass({
  checkFollow: function() {
    var id = this.props.id;
    var url = this.props.url + "profiles/" + id;
    DataCon.loadDataFromServer(url).then(data => {
      // TODO: data.following이 undefined일 수 있을까요?
      // 그렇다고 해도 이 코드는 작동하긴 합니다만...
      this.setState({followed: !!data.following});
    }).catch(console.error);
  },

  componentDidMount: function() {
    this.checkFollow();
  },

  profileFollow: function(id) {
    if (confirm("팔로우 하시겠습니까?") === true) {
      var url = this.props.url + "profiles/" + id + "/follow";
      DataCon.postDataToServer(url, 'POST').catch(console.error);
    } else {
      return;
    }
  },

  profileUnfollow: function(id) {
    if (confirm("팔로우를 취소하시겠습니까?") === true) {
      var url = this.props.url + "profiles/" + id + "/unfollow";
      DataCon.postDataToServer(url, 'POST').catch(console.error);
    } else {
      return;
    }
  },

  getInitialState: function() {
    return {
      followed: false
    };
  },

  render: function() {
    var id = this.props.id;
    if (this.state.followed === false) {
      return (
        <p onClick={() => this.profileFollow(id)}>팔로우</p>
      );
    } else {
      return (
        <p onClick={() => this.profileUnfollow(id)}>팔로우 취소</p>
      );
    };
  }
});

export default ProfilePost;
