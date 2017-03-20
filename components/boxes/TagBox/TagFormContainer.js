import React from 'react';

import TagForm from './TagForm';

const TagFormContainer = React.createClass({

  propTypes: {
    id: React.PropTypes.number.isRequired,
    addTag: React.PropTypes.func,
    candidates: React.PropTypes.object,
    loadCandidateTags: React.PropTypes.func,
    initializeCandidateTags: React.PropTypes.func,
    getTagFormId: React.PropTypes.func
  },

  handleAdd(tagName) {
    this.props.addTag(this.props.id, tagName);
  },

  handleLoadCandidateTags(query) {
    this.props.loadCandidateTags(this.props.getTagFormId(), query);
  },

  handleInitialCandidateTags() {
    this.props.initializeCandidateTags(this.props.getTagFormId());
  },

  render() {
    const candidates = this.props.candidates[this.props.getTagFormId()];
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

export default TagFormContainer;
