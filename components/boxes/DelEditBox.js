import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {connectModals} from '../../utils';

const DelEditBox = React.createClass({
  handleArticleUpdate() {
    this.props.updateArticle(this.props.articleId);
  },

  handleArticleDelete() {
    this.props.confirmModal('알림', '이 글을 삭제하시겠습니까?', () => {
      this.props.onArticleDelete(this.props.articleId);
    });
  },

  render() {
    return this.props.mine ? (
      <div className="article-controller">
        <button className="article-delete-button" onClick={this.handleArticleDelete}>삭제</button>
        <button className="article-edit-button" onClick={this.handleArticleUpdate}>수정</button>
      </div>
    ) : (
      <div/>
    );
  }
});

const mapDispatchToProps = function (dispatch) {
  return {
    updateArticle: articleId => dispatch(push(`/${articleId}/edit`))
  };
};

export default connectModals(connect(null, mapDispatchToProps)(DelEditBox));
