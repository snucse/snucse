import React from 'react';
import {connect} from 'react-redux';

import {addTagToArticle, loadCandidateTags} from '../../actions/dispatchers';
import TagForm from './TagForm';

const ArticleTagFormContainer = React.createClass({
  handleAdd(tagName) {
    this.props.addTagToArticle(this.props.articleId, tagName);
  },

  handleLoadCandidateTags(query) {
    this.props.loadCandidateTags(query);
  },

  render() {
    return <TagForm onAdd={this.handleAdd} onLoadCandidateTags={this.handleLoadCandidateTags} candidateTags={this.props.candidates}/>;
  }
});

const mapStateToProps = function (state) {
  return {
    candidates: state.tag.candidate.tags
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    addTagToArticle: (articleId, tagName) => addTagToArticle(dispatch, articleId, tagName),
    loadCandidateTags: query => loadCandidateTags(dispatch, query)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleTagFormContainer);
