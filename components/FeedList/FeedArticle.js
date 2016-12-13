import React from 'react';
import {connect} from 'react-redux';
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
    moment.locale('kr');
    // const timeAndDate = `${article.createdAt.date}T${article.createdAt.time}`;
    const date = `${moment(article.createdAt.date, 'YYYYMMDD').format('MMM Do YYYY')}, ${moment(article.createdAt.time, 'HH:mm:ss').format('a hh:mm')}`;
    /*
    if (article.createdAt.updated === true) {
      date += `(수정됨)${moment(timeAndDate).fromNow()}`;
    }
    */
    const mine = (this.props.userId === article.writer.id);
    return (
      <li className="feed-article">
        <div className="article-writer-container">
          <img className="article-writer-image" src={article.writer.profileImageUri}/>
          <h5 className="article-writer-name">{article.writer.name}</h5>
        </div>
        <div className="article-main">
          <small className="article-date">{date}</small>
          <h5 className="article-title">{article.title}<small className="article-profiles">{article.profiles[0].name}</small></h5>
          <FileBox files={article.files}/>
          <div className="article-content">
            {result}
          </div>
          <DelEditBox mine={mine} articleId={article.id} onArticleDelete={this.handleArticleDelete}/>
          <ArticleTagBox articleId={article.id}/>
          <ArticleRecommendBox articleId={article.id} count={article.recommendationCount}/>
          <ArticleCommentBox
            articleId={article.id}
            lastComment={article.lastComment}
            commentCount={article.commentCount}
            isAddable
            />
        </div>
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
