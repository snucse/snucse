import React from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import moment from 'moment';

import {DataCon, Url} from '../utils';
import {loadArticle, onLoadArticle} from '../actions/dispatchers';
import '../stylesheets/article.styl';
import '../stylesheets/tagbox.styl';
import CommentBox from './CommentBox';
import {ArticleTagBox} from './TagBox';

const ArticleList = React.createClass({
  onScroll() {
    // http://stackoverflow.com/questions/9439725
    const scrollHeight = document.documentElement ? document.documentElement.scrollHeight : document.body.scrollHeight;
    if (window.innerHeight + window.scrollY >= scrollHeight) {
      if (this.props.loading === true) {
        return;
      }
      this.props.onLoadArticle(this.props.data.articles.length, this.props.articleNum);
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
      const timeAndDate = `${article.createdAt.date}T${article.createdAt.time}`;
      let date = `${moment(article.createdAt.date, 'YYYYMMDD').format('MMM Do YYYY')}, ${moment(article.createdAt.time, 'HH:mm:ss').format('a hh:mm')}`;
      if (article.createdAt.updated === true) {
        date += `(수정됨)${moment(timeAndDate).fromNow()}`;
      }
      const mine = (this.props.userId === article.writer.id);
      return (
        <div className="article-wrap" key={`${article.id}${article.title}`}>
          <h3 className="article-title">Title: {article.title} Profile: {article.profiles[0].name}</h3>
          <h4 className="article-author">writer: {article.writer.username}</h4><h4 className="article-date"> date: {date}</h4>
          <div className="article-content">
            {result}
          </div>
          <DelEditBox mine={mine} articleId={article.id}/>
          <ArticleTagBox articleId={article.id}/>
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
  updateArticle(articleId) {
    browserHistory.push(`/${articleId}/edit`);
  },

  handleArticleUpdate() {
    this.updateArticle(this.props.articleId);
  },

  deleteArticle() {
    const url = Url.getUrl(`articles/${this.props.articleId}`);
    DataCon.postDataToServer(url, 'DELETE');
  },

  handleDeleteArticle() {
    const check = confirm('이 글을 삭제하시겠습니까?');
    if (check === true) {
      this.deleteArticle();
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
    userId: state.userId.userId,
    loading: state.articleList.loading
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    loadArticle: id => loadArticle(dispatch, id),
    onLoadArticle: (articleNum, renderedArticleNum) =>
      onLoadArticle(dispatch, articleNum, renderedArticleNum)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
