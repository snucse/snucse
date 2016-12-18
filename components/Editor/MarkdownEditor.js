import React from 'react';
import SimpleMDE from 'simplemde';

import 'simplemde/dist/simplemde.min.css';
import '../../stylesheets/markdown-editor.styl';

const MarkdownEditor = React.createClass({
  getInitialState() {
    return {
      value: ''
    };
  },
  componentDidMount() {
    if (this.props.value && this.props.value !== this.state.value && this.simplemde != null) {
      this.simplemde.value(this.props.value);
    }
  },
  componentWillReceiveProps(props) {
    if (props.value && props.value !== this.state.value && this.simplemde != null) {
      this.simplemde.value(props.value);
    }
  },
  componentWillUnmount() {
    if (this.simplemde != null) {
      this.simplemde.toTextArea();
      this.simplemde = null;
    }
  },
  attachSimpleMde(ref) {
    if (ref == null) {
      if (this.simplemde != null) {
        this.simplemde.toTextArea();
        this.simplemde = null;
      }
      return;
    }
    const simplemde = this.simplemde = new SimpleMDE({
      element: ref,
      status: false,
      spellChecker: false
    });
    if (this.props.value) {
      simplemde.value(this.props.value);
    }
    simplemde.codemirror.on('change', () => {
      if (this.simplemde === simplemde) {
        const value = simplemde.value();
        this.setState({value});
        if (typeof this.props.onChange === 'function') {
          this.props.onChange(value);
        }
      }
    });
  },
  render() {
    return (
      <textarea className="markdown-editor" ref={this.attachSimpleMde}/>
    );
  }
});

export default MarkdownEditor;
