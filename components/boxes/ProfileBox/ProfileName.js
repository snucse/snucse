import React from 'react';

const ProfileName = React.createClass({
  getInitialState() {
    return {
      name: this.props.name,
      isEditMode: false
    };
  },

  handleEnableEditMode() {
    this.setState({
      isEditMode: true
    });
  },

  handleDisableEditMode() {
    this.setState({
      name: this.props.name,
      isEditMode: false
    });
  },

  handleClickEdit() {
    this.props.onEdit(this.state.name);
    this.handleDisableEditMode();
  },

  handleChange(e) {
    console.log(e.target);
    this.setState({
      name: e.target.value
    });
  },

  render() {
    console.log(this.props);
    if (this.props.mine !== true) {
      return <div className="profile-name"><h3>{this.props.name}</h3></div>;
    }

    if (this.state.isEditMode === false) {
      return (
        <div className="profile-name">
          <h3>{this.props.name}</h3>
          <div className="profile-name-editbox">
            <button onClick={this.handleEnableEditMode}>수정</button>
          </div>
        </div>
      );
    }

    return (
      <div className="profile-name">
        <input onChange={this.handleChange} defaultValue={this.props.name}/>
        <div className="profile-name-editbox">
          <button onClick={this.handleClickEdit}>확인</button>
        </div>
      </div>
    );
  }
});

export default ProfileName;
