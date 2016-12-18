import React from 'react';

import FileItemContainer from './FileItemContainer';

/*
 * props
 * - files: array of file
 * - alives: map(fileId -> alive) (iff editable)
 * - editable
 * - onAliveChange(fileId) (iff editable)
 */

const FileBox = React.createClass({
  render() {
    const fileItems = this.props.files.map(file => {
      return (
        <FileItemContainer
          key={file.id}
          file={file}
          onAliveChange={this.props.onAliveChange}
          editable={this.props.editable}
          alive={this.props.editable ? this.props.alives[file.id] : true}
          />
      );
    });

    return (
      <div className="file-box">
        {fileItems}
      </div>
    );
  }
});

export default FileBox;
