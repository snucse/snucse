import React from 'react';
import {connect} from 'react-redux';

import {addTagToArticle, loadCandidateTags, initializeCandidateTags} from '../../../actions/dispatchers';
import TagForm from './TagForm';

const ArticleTagFormContainer = React.createClass({
  getTagFormId() {
    return `article-${this.props.articleId}`;
  },

  handleAdd(tagName) {
    this.props.addTagToArticle(this.props.articleId, tagName);
  },

  handleLoadCandidateTags(query) {
    this.props.loadCandidateTags(this.getTagFormId(), query);
  },

  handleInitialCandidateTags() {
    this.props.initializeCandidateTags(this.getTagFormId());
  },

  render() {
    const candidates = this.props.candidates[this.getTagFormId()];
    return (
      <TagForm
        onAdd={this.handleAdd}
        onLoadCandidateTags={this.handleLoadCandidateTags}
        onInitialCandidateTags={this.handleInitialCandidateTags}
        candidateTags={candidates}
        />
    );
  }
});

const mapStateToProps = function (state) {
  return {
    candidates: state.tag.candidate.byTagFormId
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    addTagToArticle: (articleId, tagName) => addTagToArticle(dispatch, articleId, tagName),
    initializeCandidateTags: tagFormId => initializeCandidateTags(dispatch, tagFormId),
    loadCandidateTags: (tagFormId, query) => loadCandidateTags(dispatch, tagFormId, query)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleTagFormContainer);
