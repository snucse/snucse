import React from 'react';

/*
 * props
 * - id
 * - name
 * - description
 * - onEdit
 */

const ProfileEditBox = React.createClass({
  getInitialState() {
    return {};
  },

  handleNameChange(e) {
    this.setState({name: e.target.value});
  },

  handleDescChange(e) {
    this.setState({description: e.target.value});
  },

  handleClick() {
    this.props.onEdit(this.state);
  },

  render() {
    return (
      <div className="profile-box">
        <input type="text" id="name" defaultValue={this.props.name} onChange={this.handleNameChange}/>
        <textarea rows="5" id="description" defaultValue={this.props.description} onChange={this.handleDescChange}/>
        <input type="button" value="수정" onClick={this.handleClick}/>
      </div>
    );
  }
});

export default ProfileEditBox;
