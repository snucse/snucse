import React from 'react';

const ProfileAdminForm = React.createClass({
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
      <div className="profile-admin-form">
        새로운 관리자 ID: <input onChange={this.handleChange}/>
        <button onClick={this.handleClickSubmit}>변경</button>
      </div>
    );
  }
});

export default ProfileAdminForm;
