import React from 'react';
import SimpleMDE from 'simplemde';

import 'simplemde/dist/simplemde.min.css';
import '../stylesheets/markdown-editor.styl';

const MarkdownEditor = React.createClass({
  attachSimpleMde(ref) {
    if (ref == null && this.simplemde != null) {
      this.simplemde = null;
      return;
    }
    const simplemde = this.simplemde = new SimpleMDE({
      element: ref,
      status: false,
      spellChecker: false
    });
    this.simplemde.codemirror.on('change', () => {
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
    return <textarea className="markdown-editor" ref={this.attachSimpleMde}/>;
  }
});

export default MarkdownEditor;
