import React from 'react';

import {Client} from '../../utils';
import MarkdownEditor from './MarkdownEditor';
import EditorModeForm from './EditorModeForm';

const Editor = React.createClass({
  getInitialState() {
    return {
      mode: 'md',
      value: ''
    };
  },
  componentDidMount() {
    this.updateFromProps(this.props);
    if (Client.isMobile()) {
      const mode = 'text';
      this.setState({mode});
    }
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
        editor = <textarea id="article-write-form-content-input" className="write-form-input" value={this.state.value} onChange={this.handleTextareaChange}/>;
        break;
      case 'md':
        editor = <MarkdownEditor value={this.state.value} onChange={this.handleContentChange}/>;
        break;
      default:
        editor = null;
        break;
    }
    return (
      <div id="article-editor-container">
        <div id="article-editor-mode-container">
          <EditorModeForm mode={this.state.mode} onChange={this.handleModeChange}/>
        </div>
        {editor}
      </div>
    );
  }
});

export default Editor;
