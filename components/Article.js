import React from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import moment from 'moment';

import {DataCon, Url} from '../utils';
import {loadArticle, scrollArticleListEnd} from '../actions';
import '../stylesheets/article.styl';
import CommentBox from './CommentBox';

const ProtoArticle = React.createClass({
  onScroll() {
    // http://stackoverflow.com/questions/9439725
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      if (this.state.loading === true) {
        return;
      }
      setTimeout(() => {
        if (this.props.data.articles.length > this.props.articleNum) {
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
    this.props.loadArticle(this.props.id);
  },

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  },

  componentWillReceiveProps(props) {
    if (props.id !== this.props.id) {
      window.scrollTo(0, 0);
      this.props.loadArticle(props.id);
    }
  },

  getInitialState() {
    return {loading: false};
  },

  render() {
    const articleNodes = this.props.data.articles.slice(0, this.props.articleNum).map(article => {
      const temp = article.content.split('\n');
      const n = temp.length;
      const result = [];
      for (let i = 0; i < n; i++) {
        const brId = `article-br-${article.id}-${i}`;
        result.push(temp[i]);
        result.push(<br key={brId}/>);
      }
      moment.locale('kr');
      let date = `${moment(article.createdAt.date, 'YYYYMMDD').format('MMM Do YYYY')}, ${moment(article.createdAt.time, 'HH:mm:ss').format('a hh:mm')}`;
      if (article.createdAt.updated === true) {
        date += `(수정됨)${moment(article.createdAt.date, 'YYYYMMDD').fromNow()}`;
      }
      const mine = (this.props.userId === article.writer.id);
      const url = ('route' in this.props) ? this.props.route.url : this.props.url;
      return (
        <div className="article-wrap" key={`${article.id}${article.title}`}>
          <h3 className="article-title">Title: {article.title} Profile: {article.profiles[0].name}</h3>
          <h4 className="article-author">writer: {article.writer.username}</h4><h4 className="article-date"> date: {date}</h4>
          <div className="article-content">
            {result}
          </div>
          <DelEditBox url={url} mine={mine} articleNum={article.id} userId={this.props.userId}/>
          <CommentBox articleId={article.id} isAddable/>
        </div>
      );
    });
    const load = (this.props.data.articles.length <= this.props.articleNum) ?
      'End' : 'Loading...';
    return (
      <div className="article">
        {articleNodes}
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
  updateArticle(articleNum) {
    browserHistory.push(`/${articleNum}/edit`);
  },

  handleArticleUpdate() {
    this.updateArticle(this.props.articleNum);
  },

  deleteArticle(id) {
    const url = `${this.props.url}/${this.props.articleNum}?currentUserId=${id}`;
    DataCon.postDataToServer(url, 'DELETE');
  },

  handleDeleteArticle() {
    const check = confirm('이 글을 삭제하시겠습니까?');
    if (check === true) {
      this.deleteArticle(this.props.userId);
    }
  },

  render() {
    return this.props.mine ? (
      <div className="delete-edit-box">
        <button onClick={this.handleDeleteArticle}>삭제</button>
        <button onClick={this.handleArticleUpdate}>수정</button>
      </div>
    ) : (
      <div/>
    );
  }
});

const mapStateToProps = function (state) {
  return {
    data: state.articleList.data,
    articleNum: state.articleList.articleNum,
    userId: state.userId.userId
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    loadArticle: id => {
      let url = Url.getUrl('articles');
      if (id) {
        url += `?profileId=${id}`;
      }
      DataCon.loadDataFromServer(url).then(data => {
        dispatch(loadArticle(data));
      }).catch(console.error);
    },
    onScrollEnd: () => dispatch(scrollArticleListEnd())
  };
};

const Article = connect(mapStateToProps, mapDispatchToProps)(ProtoArticle);

export default Article;
