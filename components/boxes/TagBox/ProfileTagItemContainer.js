import React from 'react';
import {connect} from 'react-redux';

import {UserLevel} from '../../../utils';
import {deleteTagToProfile} from '../../../actions/dispatchers';
import TagItem from './TagItem';

const ProfileTagItemContainer = React.createClass({
  handleDelete(tagName) {
    this.props.deleteTagToProfile(this.props.profileId, tagName);
  },

  render() {
    return <TagItem deletable onDelete={this.handleDelete} tag={this.props.tag} accessible={UserLevel.tagAccessible(this.props.userLevel)}/>;
  }
});

const mapStateToProps = function (state) {
  return {
    userLevel: state.userInfo.userLevel
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    deleteTagToProfile: (profileId, tagName) => deleteTagToProfile(dispatch, profileId, tagName)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTagItemContainer);
