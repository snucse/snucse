import React from 'react';
import {connect} from 'react-redux';

import {editProfileName} from '../../../actions/dispatchers';
import ProfileContent from './ProfileContent';

const ProfileNameContainer = React.createClass({
  handleEdit(newName) {
    if (this.props.name !== newName) {
      this.props.editProfileName(this.props.id, newName);
    }
  },

  render() {
    return (
      <ProfileContent
        content={this.props.name}
        onEdit={this.handleEdit}
        mine={this.props.mine}
        classname="profile-name"
        />
    );
  }
});

const mapDispatchToProps = function (dispatch) {
  return {
    editProfileName: (id, newName) => editProfileName(dispatch, id, newName)
  };
};

export default connect(null, mapDispatchToProps)(ProfileNameContainer);
