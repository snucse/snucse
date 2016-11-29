import React from 'react';
import {connect} from 'react-redux';

import {editProfileName} from '../../../actions/dispatchers';
import ProfileName from './ProfileName';

const ProfileNameContainer = React.createClass({
  handleEdit(newName) {
    this.props.editProfileName(this.props.id, newName);
  },

  render() {
    return (
      <ProfileName
        name={this.props.name}
        onEdit={this.handleEdit}
        mine={this.props.mine}
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
