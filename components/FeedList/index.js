import React from 'react';
import {connect} from 'react-redux';

import {loadArticle, onLoadArticle} from '../../actions/dispatchers';
import '../../stylesheets/article.styl';
import '../../stylesheets/tagbox.styl';
import FeedItem from './FeedItem';

const FeedList = React.createClass({
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
      return (
        <FeedItem type="article" data={article} key={`feeditem-article-${article.id}`}/>
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

const mapStateToProps = function (state) {
  return {
    data: state.articleList.data,
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

export default connect(mapStateToProps, mapDispatchToProps)(FeedList);
