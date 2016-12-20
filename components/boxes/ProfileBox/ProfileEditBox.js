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
      <div>
        <div className="form-group">
          <label className="form-label" htmlFor="update-profile-form-name-input">이름</label>
          <input id="update-profile-form-name-input" className="form-input" type="text" defaultValue={this.props.name} onChange={this.handleNameChange}/>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="update-profile-form-description-input">설명</label>
          <textarea id="update-profile-form-description-input" className="form-input" rows="3" defaultValue={this.props.description} onChange={this.handleDescChange}/>
        </div>
        <input id="update-profile-button" type="button" value="프로필 수정" onClick={this.handleClick}/>
      </div>
    );
  }
});

export default ProfileEditBox;
