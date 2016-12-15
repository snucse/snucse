import React from 'react';

const FileItem = React.createClass({
  render() {
    return (
      <div className="file-item">
        <a href={this.props.path}>{this.props.name}</a>
      </div>
    );
  }
});

export default FileItem;
