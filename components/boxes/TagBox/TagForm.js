import React from 'react';

import {genRefCallback} from '../../../utils';

const TagForm = React.createClass({
  handleClickAdd() {
    if ((this._content || false) && this._content.value !== '') {
      this.props.onAdd(this._content.value);
      this._content.value = '';
      this.setState({isEditMode: false});
    }
  },

  handleClickShowForm() {
    this.setState({isEditMode: true});
  },

  handleClickHideForm() {
    this.setState({isEditMode: false});
  },

  getInitialState() {
    return {
      isEditMode: false
    };
  },

  render() {
    const form = this.state.isEditMode ?
      <form className="tag-form">
        <input ref={genRefCallback(this, '_content')}/>
        <input onClick={this.handleClickAdd} type="button" value="추가"/>
        <input onClick={this.handleClickHideForm} type="button" value="취소"/>
      </form> :
      null;
    return (
      <section className="tag-form-wrapper">
        <button onClick={this.handleClickShowForm}>태그추가</button>
        {form}
      </section>
    );
  }
});

export default TagForm;
