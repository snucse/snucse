import React from 'react';

const ProfileContent = React.createClass({
  getInitialState() {
    return {
      isEditMode: false
    };
  },

  componentWillReceiveProps(props) {
    if (this.props.id !== props.id) {
      // reload contents
      this.setState({
        content: props.content,
        isEditMode: false
      });
    }
  },

  handleEnableEditMode() {
    this.setState({
      isEditMode: true
    });
  },

  handleDisableEditMode() {
    this.setState({
      content: this.props.content,
      isEditMode: false
    });
  },

  handleClickEdit() {
    this.props.onEdit(this.state.content);
    this.handleDisableEditMode();
  },

  handleChange(e) {
    this.setState({
      content: e.target.value
    });
  },

  render() {
    const {content, mine, classname} = this.props;
    if (mine !== true) {
      return <div className={classname}>{content}</div>;
    }

    if (this.state.isEditMode === false) {
      return (
        <div className={classname}>
          {content}
          <button onClick={this.handleEnableEditMode}>수정</button>
        </div>
      );
    }

    return (
      <div className={classname}>
        <input onChange={this.handleChange} defaultValue={this.props.content}/>
        <button onClick={this.handleClickEdit}>확인</button>
      </div>
    );
  }
});

export default ProfileContent;
