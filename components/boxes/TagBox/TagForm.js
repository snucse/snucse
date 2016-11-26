import React from 'react';
import {connect} from 'react-redux';

import {genRefCallback, UserLevel} from '../../../utils';

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
    if (this.props.userLevel !== UserLevel.REGULAR) {
      return null;
    }
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

function mapStateToProps(state) {
  return {
    userLevel: state.userInfo.userLevel
  };
}

export default connect(mapStateToProps)(TagForm);
