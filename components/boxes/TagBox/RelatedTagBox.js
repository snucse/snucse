import React from 'react';
import {connect} from 'react-redux';

import {
  makeTagRelationship,
  loadCandidateTags,
  initializeCandidateTags,
  breakTagRelationship
} from '../../../actions/dispatchers';
import TagBox from './TagBox';

const RelatedTagBox = React.createClass({

  propTypes: {
    targetTagName: React.PropTypes.string.isRequired,
    relatedTags: React.PropTypes.array
  },

  getTagFormId() {
    return `related-${this.props.targetTagName}`;
  },

  render() {
    return (
      <TagBox
        id={this.props.targetTagName}
        addable
        addTag={this.props.makeTagRelationship}
        candidates={this.props.candidates}
        loadCandidateTags={this.props.loadCandidateTags}
        initializeCandidateTags={this.props.initializeCandidateTags}
        getTagFormId={this.getTagFormId}
        userLevel={this.props.userLevel}
        deletable
        deleteTag={this.props.breakTagRelationship}
        tags={this.props.relatedTags}
        />
    );
  }
});

const mapStateToProps = function (state) {
  return {
    userLevel: state.userInfo.userLevel,
    candidates: state.tag.candidate.byTagFormId
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    breakTagRelationship: (targetTagName, tagName) => breakTagRelationship(dispatch, targetTagName, tagName),
    makeTagRelationship: (targetTagName, tagName) => makeTagRelationship(dispatch, targetTagName, tagName),
    initializeCandidateTags: tagFormId => initializeCandidateTags(dispatch, tagFormId),
    loadCandidateTags: (tagFormId, query) => loadCandidateTags(dispatch, tagFormId, query)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RelatedTagBox);
