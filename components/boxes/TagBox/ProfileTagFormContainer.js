import React from 'react';
import {connect} from 'react-redux';

import {addTagToProfile, loadCandidateTags, initializeCandidateTags} from '../../../actions/dispatchers';
import TagForm from './TagForm';

const ProfileTagFormContainer = React.createClass({
  getTagFormId() {
    return `profile-${this.props.profileId}`;
  },

  handleAdd(tagName) {
    this.props.addTagToProfile(this.props.profileId, tagName);
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
    addTagToProfile: (profileId, tagName) => addTagToProfile(dispatch, profileId, tagName),
    initializeCandidateTags: tagFormId => initializeCandidateTags(dispatch, tagFormId),
    loadCandidateTags: (tagFormId, query) => loadCandidateTags(dispatch, tagFormId, query)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTagFormContainer);
