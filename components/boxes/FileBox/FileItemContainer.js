import React from 'react';

import FileItem from './FileItem';

/*
 * props
 * - file
 *   - id
 *   - name
 *   - path
 * - onAliveChange(fileId)
 * - editable
 * - alive
 */

const FileEditBox = React.createClass({
  render() {
    return <button type="button" onClick={this.props.onClick}>{this.props.alive ? '제거' : '복구'}</button>;
  }
});

const FileItemContainer = React.createClass({
  handleEditClick() {
    this.props.onAliveChange(this.props.file.id);
  },

  render() {
    const {file, editable, alive} = this.props;
    const fileEditBox = editable ? (
      <FileEditBox id={file.id} onClick={this.handleEditClick} alive={alive}/>
    ) : (
      null
    );

    return (
      <div className="file-item-container">
        <FileItem name={file.name} path={file.path}/>
        {fileEditBox}
      </div>
    );
  }
});

export default FileItemContainer;
