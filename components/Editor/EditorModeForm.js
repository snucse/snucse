import React from 'react';

const editorModes = [
  {type: 'text', description: '텍스트'},
  {type: 'md', description: 'Markdown'},
  {type: 'html', description: 'HTML'}
];

const EditorModeForm = React.createClass({
  getInitialState() {
    return {
      mode: editorModes[0].type
    };
  },
  componentDidMount() {
    if (this.props.mode) {
      this.setState({mode: this.props.mode});
    }
  },
  componentWillReceiveProps(props) {
    if (props.mode) {
      this.setState({mode: props.mode});
    }
  },
  handleCheckChange(e) {
    if (this.state.mode !== e.target.value) {
      const mode = e.target.value;
      this.setState({mode});
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(mode);
      }
    }
  },
  render() {
    const editorModeButtons = editorModes.map(item => {
      const checked = item.type === this.state.mode;
      return (
        <label key={`rendering-mode-button-${item.type}`}>
          <input type="radio" name="renderingMode" value={item.type} checked={checked} onChange={this.handleCheckChange}/>
          {item.description}
        </label>
      );
    });
    return (
      <span className="editor-mode">
        {editorModeButtons}
      </span>
    );
  }
});

export default EditorModeForm;
