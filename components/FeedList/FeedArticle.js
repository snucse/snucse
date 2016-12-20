import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Measure from 'react-measure';
import moment from 'moment';

import {FileBox, DelEditBox, ArticleTagBox, ArticleRecommendBox, ArticleCommentBox} from '../boxes';

const FeedArticle = React.createClass({
  handleArticleDelete(articleId) {
    this.props.onArticleDelete(articleId);
  },

  handleMeasure(dimensions) {
    this.setState({
      height: dimensions.height
    });
  },

  getInitialState() {
    return {
      width: -1,
      height: -1
    };
  },

  render() {
    const {article} = this.props;

    moment.locale('ko');
    const {height} = this.state;
    const date = moment(article.createdAt);
    const mine = (this.props.userId === article.writer.id);
    return (
      <li className="feed-article">
        <small className="article-date" title={date.format('LLL')}>{date.fromNow()}</small>
        <h5 className="article-title"><Link to={`/${article.id}`}>{article.title}</Link><small className="article-profiles">{article.profiles[0].name}</small></h5>
        <div className="article-main">
          <div className="article-writer-container">
            <img className="article-writer-image" src={article.writer.profileImageUri}/>
            <h5 className="article-writer-name">{article.writer.name}</h5>
          </div>
          <div className="article-divider"/>
          <div className="article-content-container">
            <FileBox files={article.files}/>
            <DelEditBox mine={mine} articleId={article.id} onArticleDelete={this.handleArticleDelete}/>
            <Measure onMeasure={this.handleMeasure}>
              <div className="article-content" dangerouslySetInnerHTML={{__html: article.renderedContent}}/>
            </Measure>
            {(height >= 224) ? <span className="article-content-ellipsis">...</span> : null}
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
