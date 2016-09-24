import React from 'react';
import $ from 'jquery';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import { connect } from 'react-redux';
import CommentBox from './Comment.js';
import { DataCon } from '../utils';
import moment from 'moment';

import { loadPost, scrollPostListEnd } from '../actions'

var Post = React.createClass({
  loadPostFromServer: function() {
    var url = null;
    if('is_profile' in this.props && this.props.is_profile === true) {
      var id = this.props.id;
      url = this.props.url+"?profile_id="+id;
    } else {
      url = this.props.url;
    };
    var success = (data) => {
      this.props.onPostLoad(data)
    }
    DataCon.loadDataFromServer(url, success);
  },

  componentDidMount: function() {
    this.loadPostFromServer();
  },

  getInitialState: function() {
    return {}
  },

  render: function() {
    $(window).scroll(() => {
      var loading = false
      if($(window).scrollTop() == $(document).height() - $(window).height()) {
        if (loading === true) {
          return;
        } else {
          setTimeout(() => {
            if (this.props.data.articles.length > this.props.post_num) {
              // 보여주는 것보다 갖고 있는게 더 적으면
              this.props.onScrollEnd()
              // 더 보여달라는 요청
            }
            loading = false;
          }, 1000);
          loading = true;
          return;
        }
      }
    });
    var flag = 0;
    var count = 0;
    var postNodes = this.props.data.articles.map((post) => {
      count += 1;
      if (count > this.props.post_num) {
        return;
      } else {
        var temp = post.content.split("\n");
        var n = temp.length;
        var result = [];
        for(let i = 0; i < n; i++) {
          var temp2 = [temp[i], <br/>];
          result = result.concat(temp2);
        }
        moment.locale('kr');
        var date = moment(post.created_at.date, 'YYYYMMDD').format('MMM Do YYYY') + ', ' + moment(post.created_at.time, 'HH:mm:ss').format('a hh:mm');
        if (post.created_at.updated === true) {
          date = date + '(수정됨)'+moment(post.created_at.date, 'YYYYMMDD').fromNow();

        }
        var user_id = 1; // TODO
        var mine = (user_id === post.writer.id);
        var url = null;
        if('route' in this.props) {
          url = this.props.route.url;
        } else {
          url = this.props.url;
        };
        return (
          <div className="PostWrap" key={post.id+post.title}>
            <DelEditBox url={url} mine={mine} post_num={post.id} user_id={user_id} />
            <h4 className="post_title">Title: {post.title} Profile: {post.profiles[0].name}</h4>
            <h3 className="post_author">writer: {post.writer.username}</h3><h3 className="post_date"> date: {date}</h3>
            <div className="content">
              {result}
            </div>
          </div>
        );
      }
    });
    if (this.props.data.articles.length <= this.props.post_num) {
      var load = 'End';
    } else {
      var load = 'Loading...';
    }
    return (
      <div className="Post">
        {postNodes}
        <div className="more">
          <br/>
          <br/>
          <br/>
          {load}
        </div>
      </div>
    );
  }
});

var DelEditBox = React.createClass({
  submitpage: function(post_num) {
    browserHistory.push('/'+post_num+'/edit')
  },

  handlePostDelete: function(id) {
    var url = this.props.url + '/' + this.props.post_num + '?current_user_id=' + id;
    DataCon.postDataToServer(url, '', 'DELETE');
  },

  delete_post: function(e) {
    var check = confirm("이 글을 삭제하시겠습니까?");
    if (check === true) {
      this.handlePostDelete(this.props.user_id)
    } else {
      return;
    };
  },

  render: function() {
    if(this.props.mine) {
      return (
        <div className="delete_edit_box">
          <strong onClick={this.delete_post}>삭제</strong>
          <strong onClick={this.submitpage.bind(this,this.props.post_num)}>수정</strong>
        </div>
      );
    } else {
      return (
        <div/>
      );
    };
  }
});

let mapStateToProps = function(state) {
  return {
    data: state.postList.data,
    post_num: state.postList.post_num,
  }
}

let mapDispatchToProps = function(dispatch) {
  return {
    onPostLoad: (data) => { dispatch(loadPost(data)) },
    onScrollEnd: () => { dispatch(scrollPostListEnd()) },
  }
}

Post = connect(mapStateToProps, mapDispatchToProps)(Post);

export default Post;
