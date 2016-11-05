import React from 'react';
import {connect} from 'react-redux';

import {deleteTagToProfile} from '../../actions/dispatchers.js';
import TagItem from './TagItem.js';

const ProfileTagItemContainer = React.createClass({
  handleDelete(tagName) {
    this.props.deleteTagToProfile(this.props.profileId, tagName);
  },

  render() {
    return <TagItem onDelete={this.handleDelete} tag={this.props.tag}/>;
  }
});

const mapDispatchToProps = function (dispatch) {
  return {
    deleteTagToProfile: (profileId, tagName) => deleteTagToProfile(dispatch, profileId, tagName)
  };
};

export default connect(null, mapDispatchToProps)(ProfileTagItemContainer);
