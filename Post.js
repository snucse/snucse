import React from 'react';
import $ from 'jquery';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import CommentBox from './Comment.js';
import DataCon from './Util.js';
import moment from 'moment';

var Post = React.createClass({
  loadPostFromServer: function() {
    var url = null;
    if('is_profile' in this.props && this.props.is_profile === true) {
      var id = this.props.id;
      url = this.props.url+"?profile_id="+id;
    } else {
      url = this.props.url;
    };
    var success = function(data) {
      this.setState({data: data});
    }.bind(this);
    DataCon.loadDataFromServer(url, success);
  },

  Interval: null,

  componentDidMount: function() {
    this.loadPostFromServer();
    this.Interval = setInterval(this.loadPostFromServer, 2000);
  },

  componentWillUnmount: function() {
    this.state=null;
    clearInterval(this.Interval);
  },

  getInitialState: function() {
    return {data: {articles:[]}, end: true, loading: true, post_num: 5};
  },

  render: function() {
    var _this = this;
    $(window).scroll(function() {
      if($(window).scrollTop() == $(document).height() - $(window).height()) {
        if (_this.loading == true) {
          return;
        } else {
          _this.loading = true;
          setTimeout(function() {
            _this.state.post_num += 1;
            console.log(_this.state);
            _this.loading = false;
          }, 1000);
          return;
        }
      }
    });
    var flag = 0;
    var temp = this.state.data.articles;
    var count = 0;
    var postNodes = this.state.data.articles.map(function(post) {
      count += 1;
      if (count > _this.state.post_num) {
        _this.end = false;
        return;
      } else {
        var temp = post.content.split("\n");
        var n = temp.length;
        var i = 0;
        var result = []
        for(var i = 0; i < n; i++) {
          var temp2 = [temp[i], <br/>];
          result = result.concat(temp2);
        }
        var is_updated = 0;
        moment.locale('kr');
        var date = moment(post.created_at.date, 'YYYYMMDD').format('MMM Do YYYY') + ', ' + moment(post.created_at.time, 'HH:mm:ss').format('a hh:mm');
        if (post.created_at.updated === true) {
          date = date + '(수정됨)'+moment(post.created_at.date, 'YYYYMMDD').fromNow();

        }
        var user_id=1;
        var mine=true;
        if( user_id!=post.writer.id ) {
          mine=false;
        }
        var url = null;
        if('route' in _this.props) {
          url = _this.props.route.url;
        } else {
          url = _this.props.url;
        };
        _this.end = true;
        return (
          <div className="PostWrap" key={post.id+post.title}>
            <DelEditBox url={url} mine={mine} post_num={post.id} user_id={user_id} />
            <h4 className="post_title">Title: {post.title} Group: {post.profiles[0].name}</h4>
            <h3 className="post_author">writer: {post.writer.username}</h3><h3 className="post_date"> date: {date}</h3>
            <div className="content">
              {result}
            </div>
          </div>
        );
      }
    });
    if (this.end == true) {
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


export default Post;
