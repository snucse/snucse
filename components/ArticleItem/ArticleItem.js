import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import moment from 'moment';

import {Url, DataCon} from '../../utils';
import {FileBox, DelEditBox, ArticleTagBox, ArticleRecommendBox, ArticleCommentBox} from '../boxes';

import '../../stylesheets/article.styl';

const ArticleItem = React.createClass({
  handleArticleDelete(articleId) {
    const url = Url.getUrl(`/articles/${articleId}`);
    DataCon.postDataToServer(url, 'DELETE')
      .then(() => {
        browserHistory.goBack();
      }).catch(console.error);
  },

  render() {
    const {article} = this.props;

    moment.locale('ko');
    const date = moment(article.createdAt);
    const mine = (this.props.userId === article.writer.id);
    return (
      <div className="feed-article">
        <small className="article-date" title={date.format('LLL')}>{date.fromNow()}</small>
        <h5 className="article-title">{article.title}<small className="article-profiles">{article.profiles[0].name}</small></h5>
        <div className="article-main">
          <div className="article-writer-container">
            <img className="article-writer-image" src={article.writer.profileImageUri}/>
            <h5 className="article-writer-name">{article.writer.name}</h5>
          </div>
          <div className="article-divider"/>
          <div className="article-content-container">
            <FileBox files={article.files}/>
            <DelEditBox mine={mine} articleId={article.id} onArticleDelete={this.handleArticleDelete}/>
            <div className="article-content" dangerouslySetInnerHTML={{__html: article.renderedContent}}/>
          </div>
        </div>
        <ArticleRecommendBox articleId={article.id} count={article.recommendationCount}/>
        <ArticleTagBox articleId={article.id}/>
        <ArticleCommentBox
          articleId={article.id}
          lastComment={article.lastComment}
          commentCount={article.commentCount}
          isAddable
          />
      </div>
    );
  }
});

const mapStateToProps = function (state) {
  return {
    userId: state.userInfo.userId
  };
};

export default connect(mapStateToProps)(ArticleItem);
