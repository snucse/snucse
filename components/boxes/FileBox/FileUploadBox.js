import React from 'react';

const FileForm = React.createClass({
  render() {
    return <input type="file" name={this.props.fileId} onChange={this.props.onChange}/>;
  }
});

const FileDelBox = React.createClass({
  render() {
    return <button type="button" name={this.props.fileId} onClick={this.props.onClick}>삭제</button>;
  }
});

/*
 * props
 * - id
 * - onFileChange
 * - onFileDelete
 */

const FileUploadBox = React.createClass({
  getInitialState() {
    return {
      index: 0,
      fileIds: []
    };
  },

  handleChange(e) {
    this.props.onFileChange(e.target.name, e.target.files[0]);
  },

  handleClick(e) {
    const fileId = Number(e.target.name);
    this.props.onFileDelete(fileId);
    this.setState({
      fileIds: this.state.fileIds.filter(oldFileId => oldFileId !== fileId)
    });
  },

  handleAdd() {
    this.setState({
      index: this.state.index + 1,
      fileIds: this.state.fileIds.concat(this.state.index)
    });
  },

  render() {
    const fileForms = this.state.fileIds.map(fileId => {
      return (
        <div className="file-form" key={`${this.props.id}-${fileId}`}>
          <FileForm fileId={fileId} onChange={this.handleChange}/>
          <FileDelBox fileId={fileId} onClick={this.handleClick}/>
        </div>
      );
    });

    return (
      <div className="file-upload-box">
        {fileForms}
        <button type="button" onClick={this.handleAdd}>파일 추가</button>
      </div>
    );
  }
});

export default FileUploadBox;
