import React from 'react';

import MarkdownEditor from './MarkdownEditor';
import EditorModeForm from './EditorModeForm';

const Editor = React.createClass({
  getInitialState() {
    return {
      mode: 'text',
      value: ''
    };
  },
  componentDidMount() {
    this.updateFromProps(this.props);
  },
  componentWillReceiveProps(props) {
    this.updateFromProps(props);
  },
  updateFromProps(props) {
    const {mode, value} = props;
    if (value != null && this.state.value !== value) {
      this.setState({value});
      if (typeof props.onChange === 'function') {
        props.onChange(value);
      }
    }
    if (mode != null && this.state.mode !== mode) {
      this.setState({mode});
      if (typeof props.onModeChange === 'function') {
        props.onModeChange(mode);
      }
    }
  },
  handleTextareaChange(e) {
    this.handleContentChange(e.target.value);
  },
  handleContentChange(value) {
    if (this.state.value !== value) {
      this.setState({value});
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(value);
      }
    }
  },
  handleModeChange(mode) {
    if (this.state.mode !== mode) {
      this.setState({mode});
      if (typeof this.props.onModeChange === 'function') {
        this.props.onModeChange(mode);
      }
    }
  },
  render() {
    let editor = null;
    switch (this.state.mode) {
      case 'text':
      case 'html':
        editor = <textarea value={this.state.value} className="simple-textarea" onChange={this.handleTextareaChange}/>;
        break;
      case 'md':
        editor = <MarkdownEditor value={this.state.value} onChange={this.handleContentChange}/>;
        break;
      default:
        editor = null;
        break;
    }
    return (
      <div>
        {editor}<br/>
        글쓰기 모드: <EditorModeForm value={this.state.mode} onChange={this.handleModeChange}/>
      </div>
    );
  }
});

export default Editor;
