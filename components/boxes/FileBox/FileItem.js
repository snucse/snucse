import React from 'react';

const FileItem = React.createClass({
  render() {
    return (
      <a href={this.props.path}>{this.props.name}</a>
    );
  }
});

export default FileItem;
