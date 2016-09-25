import React from 'react';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import { connect } from 'react-redux';
import { DataCon } from '../utils';
import CommentBox from './Comment'
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

  onScroll() {
    const list = document.documentElement;
    // http://stackoverflow.com/questions/9439725
    if(window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      if (this.state.loading === true) {
        return;
      } else {
        setTimeout(() => {
          if (this.props.data.articles.length > this.props.post_num) {
            // 보여주는 것보다 갖고 있는게 더 적으면
            this.props.onScrollEnd()
            // 더 보여달라는 요청
          }
          this.setState({loading: false});
        }, 1000);
        this.setState({loading: true});
        return;
      }
    }
  },

  componentDidMount: function() {
    window.addEventListener('scroll', this.onScroll);
    this.loadPostFromServer();
  },

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  },

  getInitialState: function() {
    return {loading: false}
  },

  render: function() {
    const postNodes = this.props.data.articles.slice(0, this.props.post_num).map(post => {
      var temp = post.content.split("\n");
      var n = temp.length;
      var result = [];
      for(let i = 0; i < n; i++) {
        const brId = `post-br-${post.id}-${i}`;
        result.push(temp[i]);
        result.push(<br key={brId} />);
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
          <h3 className="post_title">Title: {post.title} Profile: {post.profiles[0].name}</h3>
          <h4 className="post_author">writer: {post.writer.username}</h4><h4 className="post_date"> date: {date}</h4>
          <div className="content">
            {result}
          </div>
          <DelEditBox url={url} mine={mine} post_num={post.id} user_id={user_id} />
          <CommentBox articleId={post.id} isAddable={true} />
        </div>
      );
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
          <span onClick={this.delete_post}>삭제</span>
          <span onClick={this.submitpage.bind(this,this.props.post_num)}>수정</span>
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
