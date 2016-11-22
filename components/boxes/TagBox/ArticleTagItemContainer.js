import React from 'react';
import {connect} from 'react-redux';

import {deleteTagToArticle} from '../../../actions/dispatchers';
import TagItem from './TagItem';

const ArticleTagItemContainer = React.createClass({
  handleDelete(tagName) {
    this.props.deleteTagToArticle(this.props.articleId, tagName);
  },

  render() {
    return <TagItem onDelete={this.handleDelete} tag={this.props.tag}/>;
  }
});

const mapDispatchToProps = function (dispatch) {
  return {
    deleteTagToArticle: (articleId, tagName) => deleteTagToArticle(dispatch, articleId, tagName)
  };
};

export default connect(null, mapDispatchToProps)(ArticleTagItemContainer);
