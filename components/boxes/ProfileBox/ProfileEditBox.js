import React from 'react';

import Editor from '../../Editor';

/*
 * props
 * - id
 * - name
 * - description
 * - onEdit
 * - renderingMode
 */

const ProfileEditBox = React.createClass({
  getInitialState() {
    const {description, renderingMode} = this.props;
    return {
      description,
      renderingMode
    };
  },

  handleNameChange(e) {
    this.setState({name: e.target.value});
  },

  handleDescChange(value) {
    this.setState({description: value});
  },

  handleModeChange(mode) {
    this.setState({renderingMode: mode});
  },

  handleClick() {
    const {name, description} = this.state;
    const data = {};
    if (name !== undefined) {
      data.name = name.trim();
    }
    if (description !== undefined) {
      data.description = description.trim();
    }
    data.renderingMode = this.state.renderingMode;
    this.props.onEdit(data);
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
          <Editor value={this.state.description} mode={this.state.renderingMode} onChange={this.handleDescChange} onModeChange={this.handleModeChange}/>
        </div>
        <input id="update-profile-button" type="button" value="프로필 수정" onClick={this.handleClick}/>
      </div>
    );
  }
});

export default ProfileEditBox;
