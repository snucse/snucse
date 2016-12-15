import React from 'react';
import {connect} from 'react-redux';

import {UserLevel} from '../../../utils';
import {breakTagRelationship} from '../../../actions/dispatchers';
import TagItem from './TagItem';

const RelatedTagItemContainer = React.createClass({
  handleDelete(tagName) {
    this.props.breakTagRelationship(this.props.targetTagName, tagName);
  },

  render() {
    return <TagItem onDelete={this.handleDelete} tag={this.props.tag} accessible={UserLevel.tagAccessible(this.props.userLevel)}/>;
  }
});

const mapStateToProps = function (state) {
  return {
    userLevel: state.userInfo.userLevel
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    breakTagRelationship: (targetTagName, relatedTagName) => breakTagRelationship(dispatch, targetTagName, relatedTagName)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RelatedTagItemContainer);
