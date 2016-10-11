import React from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import moment from 'moment';

import {DataCon, Url} from '../utils';
import {loadPost, scrollPostListEnd} from '../actions';
import CommentBox from './CommentBox';

const ProtoPost = React.createClass({
  loadPostFromServer() {
    let url = Url.getUrl(`articles`);
    if (this.props.isProfile === true) {
      const {id} = this.props;
      url += `?profileId=${id}`;
    }
    DataCon.loadDataFromServer(url).then(
      this.props.onPostLoad
    ).catch(console.error);
  },

  onScroll() {
    // http://stackoverflow.com/questions/9439725
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      if (this.state.loading === true) {
        return;
      }
      setTimeout(() => {
        if (this.props.data.articles.length > this.props.postNum) {
          // 보여주는 것보다 갖고 있는게 더 적으면
          this.props.onScrollEnd();
          // 더 보여달라는 요청
        }
        this.setState({loading: false});
      }, 1000);
      this.setState({loading: true});
    }
  },

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    this.loadPostFromServer();
  },

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  },

  getInitialState() {
    return {loading: false};
  },

  render() {
    const postNodes = this.props.data.articles.slice(0, this.props.postNum).map(post => {
      const temp = post.content.split('\n');
      const n = temp.length;
      const result = [];
      for (let i = 0; i < n; i++) {
        const brId = `post-br-${post.id}-${i}`;
        result.push(temp[i]);
        result.push(<br key={brId}/>);
      }
      moment.locale('kr');
      let date = `${moment(post.createdAt.date, 'YYYYMMDD').format('MMM Do YYYY')}, ${moment(post.createdAt.time, 'HH:mm:ss').format('a hh:mm')}`;
      if (post.createdAt.updated === true) {
        date += `(수정됨)${moment(post.createdAt.date, 'YYYYMMDD').fromNow()}`;
      }
      const mine = (this.props.userId === post.writer.id);
      const url = ('route' in this.props) ? this.props.route.url : this.props.url;
      return (
        <div className="PostWrap" key={`${post.id}${post.title}`}>
          <h3 className="post_title">Title: {post.title} Profile: {post.profiles[0].name}</h3>
          <h4 className="post_author">writer: {post.writer.username}</h4><h4 className="post_date"> date: {date}</h4>
          <div className="content">
            {result}
          </div>
          <DelEditBox url={url} mine={mine} postNum={post.id} userId={this.props.userId}/>
          <CommentBox articleId={post.id} isAddable/>
        </div>
      );
    });
    const load = (this.props.data.articles.length <= this.props.postNum) ?
      'End' : 'Loading...';
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

const DelEditBox = React.createClass({
  updatePost(postNum) {
    browserHistory.push(`/${postNum}/edit`);
  },

  handlePostUpdate() {
    this.updatePost(this.props.postNum);
  },

  deletePost(id) {
    const url = `${this.props.url}/${this.props.postNum}?currentUserId=${id}`;
    DataCon.postDataToServer(url, 'DELETE');
  },

  handleDeletePost() {
    const check = confirm('이 글을 삭제하시겠습니까?');
    if (check === true) {
      this.deletePost(this.props.userId);
    }
  },

  render() {
    return this.props.mine ? (
      <div className="delete_edit_box">
        <span onClick={this.handleDeletePost}>삭제</span>
        <span onClick={this.handlePostUpdate}>수정</span>
      </div>
    ) : (
      <div/>
    );
  }
});

const mapStateToProps = function (state) {
  return {
    data: state.postList.data,
    postNum: state.postList.postNum,
    userId: state.userId.userId
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    onPostLoad: data => dispatch(loadPost(data)),
    onScrollEnd: () => dispatch(scrollPostListEnd())
  };
};

const Post = connect(mapStateToProps, mapDispatchToProps)(ProtoPost);

export default Post;
