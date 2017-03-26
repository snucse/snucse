import React from 'react';
import {connect} from 'react-redux';

import {
  addTagToProfile,
  loadCandidateTags,
  initializeCandidateTags,
  deleteTagToProfile
} from '../../../actions/dispatchers';
import TagBox from './TagBox';

const ProfileTagBox = React.createClass({
  propTypes: {
    profileId: React.PropTypes.string.isRequired
  },

  getTagFormId() {
    return `profile-${this.props.profileId}`;
  },

  render() {
    return (
      <TagBox
        id={this.props.profileId}
        addable
        addTag={this.props.addTagToProfile}
        candidates={this.props.candidates}
        loadCandidateTags={this.props.loadCandidateTags}
        initializeCandidateTags={this.props.initializeCandidateTags}
        getTagFormId={this.getTagFormId}
        userLevel={this.props.userLevel}
        deletable
        deleteTag={this.props.deleteTagToProfile}
        tags={this.props.tags[this.props.profileId]}
        />
    );
  }
});

const mapStateToProps = function (state) {
  return {
    userLevel: state.userInfo.userLevel,
    candidates: state.tag.candidate.byTagFormId,
    tags: state.tag.attached.profiles
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    deleteTagToProfile: (profileId, tagName) => deleteTagToProfile(dispatch, profileId, tagName),
    addTagToProfile: (profileId, tagName) => addTagToProfile(dispatch, profileId, tagName),
    initializeCandidateTags: tagFormId => initializeCandidateTags(dispatch, tagFormId),
    loadCandidateTags: (tagFormId, query) => loadCandidateTags(dispatch, tagFormId, query)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTagBox);
