import React from 'react';
import {connect} from 'react-redux';

import {UserLevel} from '../../../utils';
import {deleteTagToArticle} from '../../../actions/dispatchers';
import TagItem from './TagItem';

const ArticleTagItemContainer = React.createClass({
  handleDelete(tagName) {
    this.props.deleteTagToArticle(this.props.articleId, tagName);
  },

  render() {
    return <TagItem onDelete={this.handleDelete} tag={this.props.tag} accessible={UserLevel.tagAccessible(this.props.userLevel)}/>;
  }
});

const mapStateToProps = function (state) {
  return {
    userLevel: state.userInfo.userLevel
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    deleteTagToArticle: (articleId, tagName) => deleteTagToArticle(dispatch, articleId, tagName)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleTagItemContainer);
