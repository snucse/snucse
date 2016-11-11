import React from 'react';
import {browserHistory} from 'react-router';
import {DataCon, Url} from '../../utils';

const DelEditBox = React.createClass({
  updateArticle(articleId) {
    browserHistory.push(`/${articleId}/edit`);
  },

  handleArticleUpdate() {
    this.updateArticle(this.props.articleId);
  },

  deleteArticle() {
    const url = Url.getUrl(`articles/${this.props.articleId}`);
    DataCon.postDataToServer(url, 'DELETE');
  },

  handleDeleteArticle() {
    const check = confirm('이 글을 삭제하시겠습니까?');
    if (check === true) {
      this.deleteArticle();
    }
  },

  render() {
    return this.props.mine ? (
      <div className="delete-edit-box">
        <button onClick={this.handleDeleteArticle}>삭제</button>
        <button onClick={this.handleArticleUpdate}>수정</button>
      </div>
    ) : (
      <div/>
    );
  }
});

export default DelEditBox;
