import React from 'react';

const ProfileAdminTransferForm = React.createClass({
  getInitialState() {
    return {
      newId: ''
    };
  },

  handleChange(e) {
    this.setState({
      newId: e.target.value
    });
  },

  handleClickSubmit() {
    this.props.onClickSubmit(this.state.newId);
  },

  render() {
    return (
      <div>
        <div className="form-group">
          <label className="form-label" htmlFor="update-profile-form-admin-input">새로운 관리자 ID</label>
          <input id="update-profile-form-admin-input" className="form-input" onChange={this.handleChange}/>
        </div>
        <button id="update-profile-button" onClick={this.handleClickSubmit}>변경</button>
      </div>
    );
  }
});

export default ProfileAdminTransferForm;
