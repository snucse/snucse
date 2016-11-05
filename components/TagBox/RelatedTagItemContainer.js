import React from 'react';
import {connect} from 'react-redux';

import {breakTagRelationship} from '../../actions/dispatchers.js';
import TagItem from './TagItem.js';

const RelatedTagItemContainer = React.createClass({
  handleDelete(tagName) {
    this.props.breakTagRelationship(this.props.targetTagName, tagName);
  },

  render() {
    return <TagItem onDelete={this.handleDelete} tag={this.props.tag}/>;
  }
});

const mapDispatchToProps = function (dispatch) {
  return {
    breakTagRelationship: (targetTagName, relatedTagName) => breakTagRelationship(dispatch, targetTagName, relatedTagName)
  };
};

export default connect(null, mapDispatchToProps)(RelatedTagItemContainer);
