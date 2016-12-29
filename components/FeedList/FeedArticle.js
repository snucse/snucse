import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Measure from 'react-measure';
import moment from 'moment';
import classnames from 'classnames';

import Realtime from '../Realtime';
import {FileBox, DelEditBox, ArticleTagBox, ArticleRecommendBox, ArticleCommentBox} from '../boxes';

const FeedArticle = React.createClass({
  handleArticleDelete(articleId) {
    this.props.onArticleDelete(articleId);
  },

  handleMeasure(dimensions) {
    this.setState({dimensions});
  },

  handleEllipsisClick() {
    this.setState({loaded: true});
  },

  getInitialState() {
    return {
      loaded: false,
      dimensions: {
        width: -1,
        height: -1
      }
    };
  },

  render() {
    const {article} = this.props;

    moment.locale('ko');
    const {loaded, dimensions} = this.state;
    const {height} = dimensions;
    const date = moment(article.createdAt);
    const mine = (this.props.userId === article.writer.id);
    const shrinked = !loaded && height >= 22.4 * 10;
    let ellipsis = null;
    if (height >= 22.4 * 40) {
      ellipsis = <Link to={`/${article.id}`} className="feed-article-content-ellipsis">더 보기</Link>;
    } else if (shrinked) {
      ellipsis = <span onClick={this.handleEllipsisClick} className="feed-article-content-ellipsis">더 보기</span>;
    }
    return (
      <li className="feed-article">
        <small className="article-date" title={date.format('LLL')}>
          <Realtime from={date}/>
        </small>
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
              <div
                className={classnames({
                  'article-content': true,
                  'feed-article-content': true,
                  'feed-article-content-shrinked': shrinked
                })}
                dangerouslySetInnerHTML={{__html: article.renderedContent}}
                />
            </Measure>
            {ellipsis}
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
