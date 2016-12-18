import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import moment from 'moment';

import {FileBox, DelEditBox, ArticleTagBox, ArticleRecommendBox, ArticleCommentBox} from '../boxes';

const FeedArticle = React.createClass({
  handleArticleDelete(articleId) {
    this.props.onArticleDelete(articleId);
  },

  render() {
    const {article} = this.props;

    const temp = article.content.split('\n');
    const n = temp.length;
    const result = [];
    for (let i = 0; i < n; i++) {
      const brId = `article-br-${article.id}-${i}`;
      result.push(temp[i]);
      result.push(<br key={brId}/>);
    }
    moment.locale('ko');
    const date = moment(article.createdAt);
    const mine = (this.props.userId === article.writer.id);
    return (
      <li className="feed-article">
        <small className="article-date" title={date.format('LLL')}>{date.fromNow()}</small>
        <h5 className="article-title"><Link to={`/${article.id}`}>{article.title}</Link><small className="article-profiles">{article.profiles[0].name}</small></h5>
        <div className="article-writer-container">
          <img className="article-writer-image" src={article.writer.profileImageUri}/>
          <h5 className="article-writer-name">{article.writer.name}</h5>
        </div>
        <div className="article-divider"/>
        <div className="article-main">
          <FileBox files={article.files}/>
          <DelEditBox mine={mine} articleId={article.id} onArticleDelete={this.handleArticleDelete}/>
          <div className="article-content">
            {result}
          </div>
        </div>
        <ArticleTagBox articleId={article.id}/>
        <ArticleRecommendBox articleId={article.id} count={article.recommendationCount}/>
        <ArticleCommentBox
          articleId={article.id}
          lastComment={article.lastComment}
          commentCount={article.commentCount}
          isAddable
          />
      </li>
    );
  }
});

const mapStateToProps = function (state) {
  return {
    userId: state.userInfo.userId
  };
};

export default connect(mapStateToProps)(FeedArticle);
