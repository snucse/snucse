import React from 'react';

import TagList from './TagList';
import TagFormContainer from './TagFormContainer';

const TagBox = React.createClass({
  propTypes: {
    id: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    addTag: React.PropTypes.func,
    candidates: React.PropTypes.object,
    loadCandidateTags: React.PropTypes.func,
    initializeCandidateTags: React.PropTypes.func,
    getTagFormId: React.PropTypes.func,
    userLevel: React.PropTypes.number,
    deletable: React.PropTypes.bool,
    deleteTag: React.PropTypes.func,
    tags: React.PropTypes.array
  },

  render() {
    return (
      <div className="tag-container">
        <TagList
          id={this.props.id}
          userLevel={this.props.userLevel}
          deletable={this.props.deletable}
          deleteTag={this.props.deleteTag}
          tags={this.props.tags}
          />
        <TagFormContainer
          id={this.props.id}
          addTag={this.props.addTag}
          candidates={this.props.candidates}
          loadCandidateTags={this.props.loadCandidateTags}
          initializeCandidateTags={this.props.initializeCandidateTags}
          getTagFormId={this.props.getTagFormId}
          />
      </div>
    );
  }
});

export default TagBox;
