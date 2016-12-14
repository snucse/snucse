import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import {DelEditBox, ArticleTagBox, CommentBox} from '../boxes';

const ArticleItem = React.createClass({
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
    const timeAndDate = `${article.createdAt.date}T${article.createdAt.time}`;
    let date = `${moment(article.createdAt.date, 'YYYYMMDD').format('MMM Do YYYY')}, ${moment(article.createdAt.time, 'HH:mm:ss').format('a hh:mm')}`;
    if (article.createdAt.updated === true) {
      date += `(수정됨)${moment(timeAndDate).fromNow()}`;
    }
    const mine = (this.props.userId === article.writer.id);
    return (
      <div className="article-wrap">
        <h3 className="article-title">Title: {article.title} Profile: {article.profiles[0].name}</h3>
        <h4 className="article-author">writer: {article.writer.username}</h4>
        <h4 className="article-date"> date: {date}</h4>
        <div className="article-content">
          {result}
        </div>
        <DelEditBox mine={mine} articleId={article.id}/>
        <ArticleTagBox articleId={article.id}/>
        <CommentBox
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
