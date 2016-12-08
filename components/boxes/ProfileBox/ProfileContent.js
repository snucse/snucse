import React from 'react';

const ProfileContent = React.createClass({
  getInitialState() {
    return {
      isEditMode: false
    };
  },

  componentWillReceiveProps(props) {
    this.setState({
      content: props.content
    });
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
      name: e.target.value
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
          <div className={`${classname}-editbox`}>
            <button onClick={this.handleEnableEditMode}>수정</button>
          </div>
        </div>
      );
    }

    return (
      <div className={classname}>
        <input onChange={this.handleChange} defaultValue={this.props.content}/>
        <div className={`${classname}-editbox`}>
          <button onClick={this.handleClickEdit}>확인</button>
        </div>
      </div>
    );
  }
});

export default ProfileContent;
