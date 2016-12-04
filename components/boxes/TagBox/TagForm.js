import React from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';

import {genRefCallback, UserLevel} from '../../../utils';

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
      this.props.onInitialCandidateTags();
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
      return;
    }
    const candidates = this.props.candidateTags || [];
    if (candidates.length === 0) {
      return;
    }
    if (event.keyCode === 40) {
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

  clickCandidateTagFuncs: {},
  handleClickCandidateTag(tag) {
    if (!(tag in this.clickCandidateTagFuncs)) {
      const func = () => {
        this._content.value = tag;
        this.setState({isShowCandidateTags: false, candidateTag: -1});
      };
      this.clickCandidateTagFuncs[tag] = func;
      return func;
    }
    return this.clickCandidateTagFuncs[tag];
  },

  handleClickShowForm() {
    this.setState({isEditMode: true});
  },

  handleClickHideForm() {
    this.props.onInitialCandidateTags();
    this.setState({
      isEditMode: false,
      isShowCandidateTags: false,
      candidateTag: -1
    });
  },

  getInitialState() {
    return {
      isEditMode: false,
      isShowCandidateTags: false,
      candidateTag: -1
    };
  },

  regularRenderer() {
    const candidateTags = this.props.candidateTags || [];
    const candidateTagListItems = candidateTags.map((candidateTag, i) => {
      if (i === this.state.candidateTag) {
        if (this._content !== null) {
          this._content.value = candidateTag.tag;
        }
      }
      return (
        <li
          className={classnames({
            'autocomplete-tag-item': true,
            'selected': i === this.state.candidateTag
          })}
          onClick={this.handleClickCandidateTag(candidateTag.tag)}
          key={candidateTag.tag}
          >
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
  },

  render() {
    const mapUserLevelToRenderer = {
      [UserLevel.REGULAR]: this.regularRenderer,
      default: () => null
    };

    return UserLevel.getRenderer(mapUserLevelToRenderer, this.props.userLevel)();
  }
});

function mapStateToProps(state) {
  return {
    userLevel: state.userInfo.userLevel
  };
}

export default connect(mapStateToProps)(TagForm);
