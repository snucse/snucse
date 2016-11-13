import React from 'react';

import {genRefCallback} from '../../utils';

const TagForm = React.createClass({
  addTag() {
    if ((this._content || false) && this._content.value !== '') {
      this.props.onAdd(this._content.value);
      this._content.value = '';
      this.setState({
        isEditMode: false,
        isShowCandidateTags: false,
        candidateTag: -1
      });
    }
  },

  handleClickAdd() {
    this.addTag();
  },

  loadCandidateTagsTimeout: null,

  handleChangeInput(event) {
    if (this._content.value === '') {
      this.setState({isShowCandidateTags: false, candidateTag: -1});
      return;
    }
    const query = event.target.value;
    clearTimeout(this.loadCandidateTagsTimeout);
    this.loadCandidateTagsTimeout = setTimeout(() => {
      // load auto complete tag list
      this.props.onLoadCandidateTags(query);
      this.setState({isShowCandidateTags: true, candidateTag: -1});
    }, 300);
  },

  handleKeyDownInput(event) {
    if (event.keyCode == 13) {
      this.addTag();
    } else if (event.keyCode === 40) {
      const candidates = this.props.candidateTags || [];
      if (candidates.length === 0) {
        return;
      }
      // down
      if (candidates.length > this.state.candidateTag + 1) {
        this.setState({
          isShowCandidateTags: true,
          candidateTag: this.state.candidateTag + 1
        });
      } else {
        this.setState({
          isShowCandidateTags: true,
          candidateTag: 0
        });
      }
    } else if (event.keyCode === 38) {
      const candidates = this.props.candidateTags || [];
      if (candidates.length === 0) {
        return;
      }
      // up
      if (this.state.candidateTag > 0) {
        this.setState({
          isShowCandidateTags: true,
          candidateTag: this.state.candidateTag - 1
        });
      } else {
        this.setState({
          isShowCandidateTags: true,
          candidateTag: candidates.length - 1
        });
      }
    }
  },

  handleClickCandidateTag(event) {
    this._content.value = event.currentTarget.innerHTML;
    // fixme search instead of innerHTML...
    this.setState({isShowCandidateTags: false, candidateTag: -1});
  },

  handleClickShowForm() {
    this.setState({isEditMode: true});
  },

  handleClickHideForm() {
    this.setState({isEditMode: false});
  },

  getInitialState() {
    return {
      isEditMode: false,
      isShowCandidateTags: false,
      candidateTag: -1
    };
  },

  render() {
    const candidateTags = this.props.candidateTags || [];
    const candidateTagListItems = candidateTags.map((candidateTag, i) => {
      let clazz;
      if (i === this.state.candidateTag) {
        clazz = 'autocomplete-tag-item selected';
        if (this._content !== null) {
          this._content.value = candidateTag.tag;
        }
      } else {
        clazz = 'autocomplete-tag-item';
      }
      return (
        <li className={clazz} onClick={this.handleClickCandidateTag} key={candidateTag.tag}>
          {candidateTag.tag}
        </li>
      );
    });
    const candidateTagList = this.state.isShowCandidateTags ?
      <ul className="autocomplete-tag-list">
        {candidateTagListItems}
      </ul> : null;
    const form = this.state.isEditMode ?
      <form className="tag-form">
        <input
          ref={genRefCallback(this, '_content')}
          onChange={this.handleChangeInput}
          onKeyDown={this.handleKeyDownInput}
          />
        <input onClick={this.handleClickAdd} type="button" value="추가"/>
        <input onClick={this.handleClickHideForm} type="button" value="취소"/>
        {candidateTagList}
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
