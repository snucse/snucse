import React from 'react';
import {connect} from 'react-redux';

import {addTagToArticle} from '../../actions/dispatchers.js';
import TagForm from './TagForm.js';

const ArticleTagFormContainer = React.createClass({
  handleAdd(tagName) {
    this.props.addTagToArticle(this.props.articleId, tagName);
  },

  render() {
    return <TagForm onAdd={this.handleAdd}/>;
  }
});

const mapDispatchToProps = function (dispatch) {
  return {
    addTagToArticle: (articleId, tagName) => addTagToArticle(dispatch, articleId, tagName)
  };
};

export default connect(null, mapDispatchToProps)(ArticleTagFormContainer);
