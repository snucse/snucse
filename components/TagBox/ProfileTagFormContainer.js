import React from 'react';
import {connect} from 'react-redux';

import {addTagToProfile} from '../../actions/dispatchers';
import TagForm from './TagForm';

const ProfileTagFormContainer = React.createClass({
  handleAdd(tagName) {
    this.props.addTagToProfile(this.props.profileId, tagName);
  },

  render() {
    return <TagForm onAdd={this.handleAdd}/>;
  }
});

const mapDispatchToProps = function (dispatch) {
  return {
    addTagToProfile: (profileId, tagName) => addTagToProfile(dispatch, profileId, tagName)
  };
};

export default connect(null, mapDispatchToProps)(ProfileTagFormContainer);
