import React from 'react';
import {connect} from 'react-redux';

import {addTagToProfile, loadCandidateTags} from '../../actions/dispatchers';
import TagForm from './TagForm';

const ProfileTagFormContainer = React.createClass({
  handleAdd(tagName) {
    this.props.addTagToProfile(this.props.profileId, tagName);
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
    addTagToProfile: (profileId, tagName) => addTagToProfile(dispatch, profileId, tagName),
    loadCandidateTags: query => loadCandidateTags(dispatch, query)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTagFormContainer);
