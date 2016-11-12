import React from 'react';
import {connect} from 'react-redux';

import {loadArticle, onLoadArticle} from '../actions/dispatchers';
import FeedList from './FeedList';

const ArticleList = React.createClass({
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.loadArticle(this.props.id);
  },

  componentWillReceiveProps(props) {
    if (props.id !== this.props.id) {
      window.scrollTo(0, 0);
      this.props.loadArticle(props.id);
    }
  },

  handleLoadMore() {
    if (this.props.loading === true) {
      return;
    }
    this.props.onLoadArticle(this.props.articles.length, this.props.articleNum);
  },

  render() {
    const feeds = this.props.articles.slice(0, this.props.articleNum).map(item => {
      return {
        type: 'article',
        ...item
      };
    });
    if (this.props.articles.length > this.props.articleNum) {
      feeds.push({
        type: 'loadmore',
        id: `${this.props.articleNum}`,
        automatic: true
      });
    }
    return (
      <FeedList feeds={feeds} onLoadMore={this.handleLoadMore}/>
    );
  }
});

const mapStateToProps = function (state) {
  return {
    articles: state.articleList.data.articles,
    articleNum: state.articleList.articleNum,
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
