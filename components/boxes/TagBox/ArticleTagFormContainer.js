import React from 'react';
import {connect} from 'react-redux';

import {addTagToArticle, loadCandidateTags, initializeCandidateTags} from '../../../actions/dispatchers';
import TagForm from './TagForm';

const ArticleTagFormContainer = React.createClass({
  handleAdd(tagName) {
    this.props.addTagToArticle(this.props.articleId, tagName);
  },

  handleLoadCandidateTags(query) {
    this.props.loadCandidateTags(query);
  },

  handleInitialCandidateTags() {
    this.props.initializeCandidateTags();
  },

  render() {
    return (
      <TagForm
        onAdd={this.handleAdd}
        onLoadCandidateTags={this.handleLoadCandidateTags}
        onInitialCandidateTags={this.handleInitialCandidateTags}
        candidateTags={this.props.candidates}
        />
    );
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
    initializeCandidateTags: () => initializeCandidateTags(dispatch),
    loadCandidateTags: query => loadCandidateTags(dispatch, query)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleTagFormContainer);
