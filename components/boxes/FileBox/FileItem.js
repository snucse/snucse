import React from 'react';

const FileItem = React.createClass({
  render() {
    return (
      <div className="file-item">
        {this.props.name}
      </div>
    );
  }
});

export default FileItem;
