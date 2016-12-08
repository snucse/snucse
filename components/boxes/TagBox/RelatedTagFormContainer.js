import React from 'react';
import {connect} from 'react-redux';

import {makeTagRelationship, loadCandidateTags, initializeCandidateTags} from '../../../actions/dispatchers';
import TagForm from './TagForm';

const RelatedTagFormContainer = React.createClass({
  handleAdd(tagName) {
    this.props.makeTagRelationship(this.props.targetTagName, tagName);
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
    makeTagRelationship: (targetTagName, relatedTagName) => makeTagRelationship(dispatch, targetTagName, relatedTagName),
    initializeCandidateTags: () => initializeCandidateTags(dispatch),
    loadCandidateTags: query => loadCandidateTags(dispatch, query)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RelatedTagFormContainer);
