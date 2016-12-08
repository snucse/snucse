import React from 'react';
import {connect} from 'react-redux';

import {editProfileDesc} from '../../../actions/dispatchers';
import ProfileContent from './ProfileContent';

const ProfileDescContainer = React.createClass({
  handleEdit(newDesc) {
    if (this.props.desc !== newDesc) {
      this.props.editProfileDesc(this.props.id, newDesc);
    }
  },

  render() {
    return (
      <ProfileContent
        content={this.props.desc}
        onEdit={this.handleEdit}
        mine={this.props.mine}
        classname="profile-desc"
        />
    );
  }
});

const mapDispatchToProps = function (dispatch) {
  return {
    editProfileDesc: (id, newDesc) => editProfileDesc(dispatch, id, newDesc)
  };
};

export default connect(null, mapDispatchToProps)(ProfileDescContainer);
