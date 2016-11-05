import React from 'react';
import {connect} from 'react-redux';

import {makeTagRelationship} from '../../actions/dispatchers.js';
import TagForm from './TagForm.js';

const RelatedTagFormContainer = React.createClass({
  handleAdd(tagName) {
    this.props.makeTagRelationship(this.props.targetTagName, tagName);
  },

  render() {
    return <TagForm onAdd={this.handleAdd}/>;
  }
});

const mapDispatchToProps = function (dispatch) {
  return {
    makeTagRelationship: (targetTagName, relatedTagName) => makeTagRelationship(dispatch, targetTagName, relatedTagName)
  };
};

export default connect(null, mapDispatchToProps)(RelatedTagFormContainer);
