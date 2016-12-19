import React from 'react';
import {browserHistory} from 'react-router';

const DelEditBox = React.createClass({
  updateArticle(articleId) {
    browserHistory.push(`/${articleId}/edit`);
  },

  handleArticleUpdate() {
    this.updateArticle(this.props.articleId);
  },

  handleArticleDelete() {
    const check = confirm('이 글을 삭제하시겠습니까?');
    if (check === true) {
      this.props.onArticleDelete(this.props.articleId);
    }
  },

  render() {
    return this.props.mine ? (
      <div className="delete-edit-box">
        <button onClick={this.handleArticleDelete}>삭제</button>
        <button onClick={this.handleArticleUpdate}>수정</button>
      </div>
    ) : (
      <div/>
    );
  }
});

export default DelEditBox;
