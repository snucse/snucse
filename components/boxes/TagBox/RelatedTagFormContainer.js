import React from 'react';
import {connect} from 'react-redux';

import {makeTagRelationship, loadCandidateTags, initializeCandidateTags} from '../../../actions/dispatchers';
import TagForm from './TagForm';

const RelatedTagFormContainer = React.createClass({
  getTagFormId() {
    return `related-${this.props.targetTagName}`;
  },

  handleAdd(tagName) {
    this.props.makeTagRelationship(this.props.targetTagName, tagName);
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
    makeTagRelationship: (targetTagName, relatedTagName) => makeTagRelationship(dispatch, targetTagName, relatedTagName),
    initializeCandidateTags: tagFormId => initializeCandidateTags(dispatch, tagFormId),
    loadCandidateTags: (tagFormId, query) => loadCandidateTags(dispatch, tagFormId, query)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RelatedTagFormContainer);
