import React from 'react';

import FileBox from './FileBox';

const WrappedFileBox = React.createClass({

  propTypes: {
    files: React.PropTypes.array,
    editable: React.PropTypes.bool,
    alives: React.PropTypes.object,
    onAliveChange: React.PropTypes.func
  },

  getInitialState() {
    return {
      showFileBox: false
    };
  },

  handleClickToggleButton() {
    this.setState({
      showFileBox: !this.state.showFileBox
    });
  },

  render() {
    const fileBox = this.state.showFileBox ? (
      <FileBox
        files={this.props.files}
        editable={this.props.editable}
        alives={this.props.alives}
        onAliveChange={this.props.onAliveChange}
        />
    ) : null;
    return (
      <div className="file-box-wrapper">
        <span onClick={this.handleClickToggleButton}>첨부파일 ({this.props.files.length})</span>
        {fileBox}
      </div>
    );
  }
});

export default WrappedFileBox;
