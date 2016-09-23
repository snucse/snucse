import React from 'react';
import $ from 'jquery';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import { DataCon } from '../utils';
import Post from './Post.js';

var Group_Post = React.createClass({
  render: function() {
    var id = this.props.id;
    return (
      <div>
        <div className="menu_of_group">
          <Link to={"/group/"+id+"/write"}>글쓰기</Link>
          <FollowBox id={id} url={this.props.url} />
        </div>
        <Post url={this.props.url+"/articles"} is_profile={true} id={id}/>
      </div>
    );
  }
});

var FollowBox = React.createClass({
  check_follow: function() {
    var id = this.props.id;
    var url = this.props.url + "profiles/" + id;
    var _this = this;
    var success = function(data) {
      if (data.following == true) {
        _this.setState({followed: true});
      } else {
        _this.setState({followed: false});
      }
    };
    DataCon.loadDataFromServer(url, success);
  },

  componentDidMount: function() {
    this.check_follow();
  },

  group_follow: function(id) {
    if (confirm("팔로우 하시겠습니까?") === true) {
      var url = this.props.url + "profiles/" + id + "/follow";
      DataCon.postDataToServer(url, '', 'POST');
    } else {
      return;
    }
  },

  group_unfollow: function(id) {
    if (confirm("팔로우를 취소하시겠습니까?") === true) {
      var url = this.props.url + "profiles/" + id + "/unfollow";
      DataCon.postDataToServer(url, '', 'POST');
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
          <p onClick={this.group_follow.bind(this, id)}>팔로우</p>
      );
    } else {
      return (
          <p onClick={this.group_unfollow.bind(this, id)}>팔로우 취소</p>
      );
    };
  }
});

export default Group_Post;
