import React from 'react';

const FileForm = React.createClass({
  render() {
    return <input type="file" onChange={this.props.onChange}/>;
  }
});

const FileDelBox = React.createClass({
  render() {
    return <button type="button" onClick={this.props.onClick}>삭제</button>;
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
    this.handleChangeCache = {};
    this.handleClickCache = {};
    return {
      index: 0,
      fileIds: []
    };
  },

  handleChangeCache: {},
  handleClickCache: {},

  handleChange(fileId) {
    if (!(fileId in this.handleChangeCache)) {
      const handler = e => {
        this.props.onFileChange(fileId, e.target.files[0]);
      };
      this.handleChangeCache[fileId] = handler;
      return handler;
    }
    return this.handleChangeCache[fileId];
  },

  handleClick(fileId) {
    if (!(fileId in this.handleClickCache)) {
      const handler = () => {
        this.props.onFileDelete(fileId);
        this.setState({
          fileIds: this.state.fileIds.filter(oldFileId => oldFileId !== fileId)
        });
      };
      this.handleClickCache[fileId] = handler;
      return handler;
    }
    return this.handleClickCache[fileId];
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
          <FileForm fileId={fileId} onChange={this.handleChange(fileId)}/>
          <FileDelBox fileId={fileId} onClick={this.handleClick(fileId)}/>
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
