import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import moment from 'moment';

import {Url, DataCon} from '../../utils';
import {FileBox, DelEditBox, ArticleTagBox, ArticleRecommendBox, ArticleCommentBox} from '../boxes';

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
      <div className="article-wrap">
        <h3 className="article-title">Title: {article.title} Profile: {article.profiles[0].name}</h3>
        <h4 className="article-author">writer: {article.writer.username}</h4>
        <h4 className="article-date"> date: {date}</h4>
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
    );
  }
});

const mapStateToProps = function (state) {
  return {
    userId: state.userInfo.userId
  };
};

export default connect(mapStateToProps)(ArticleItem);
