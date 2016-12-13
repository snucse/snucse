import React from 'react';

const FileForm = React.createClass({
  render() {
    return <input type="file" id={this.props.id} onChange={this.props.onChange}/>;
  }
});

const FileDelBox = React.createClass({
  render() {
    return <button type="button" id={this.props.id} onClick={this.props.onClick}>삭제</button>;
  }
});

const FileBox = React.createClass({
  getInitialState() {
    return {
      index: 0,
      files: {}, // pairs of (id, file obj)
      ids: []
    };
  },

  handleChangeCache: {},
  handleClickCache: {},

  handleChange(id) {
    if (!(id in this.handleChangeCache)) {
      const handler = e => {
        this.setState({
          files: {
            ...this.state.files,
            [id]: e.target.files[0]
          }
        });
      };
      this.handleChangeCache[id] = handler;
      return handler;
    }
    return this.handleChangeCache[id];
  },

  handleClick(id) {
    if (!(id in this.handleClickCache)) {
      const handler = () => {
        this.setState({
          ids: this.state.ids.filter(oldId => oldId !== id)
        });
      };
      this.handleClickCache[id] = handler;
      return handler;
    }
    return this.handleClickCache[id];
  },

  handleAdd() {
    this.setState({
      index: this.state.index + 1,
      ids: this.state.ids.concat(this.state.index)
    });
  },

  render() {
    const fileForms = this.state.ids.map(id => {
      return (
        <div className="file-form" key={`${this.props.id}-${id}`}>
          <FileForm id={id} onChange={this.handleChange(id)}/>
          <FileDelBox id={id} onClick={this.handleClick(id)}/>
        </div>
      );
    });

    return (
      <div className="file-box">
        {fileForms}
        <button type="button" onClick={this.handleAdd}>파일 추가</button>
      </div>
    );
  }
});

export default FileBox;
