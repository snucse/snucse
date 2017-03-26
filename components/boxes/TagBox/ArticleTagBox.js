import React from 'react';
import {connect} from 'react-redux';

import {
  addTagToArticle,
  loadCandidateTags,
  initializeCandidateTags,
  deleteTagToArticle
} from '../../../actions/dispatchers';
import TagBox from './TagBox';

const ArticleTagBox = React.createClass({
  propTypes: {
    articleId: React.PropTypes.number.isRequired
  },

  getTagFormId() {
    return `article-${this.props.articleId}`;
  },

  render() {
    return (
      <TagBox
        id={this.props.articleId}
        addTag={this.props.addTagToArticle}
        candidates={this.props.candidates}
        loadCandidateTags={this.props.loadCandidateTags}
        initializeCandidateTags={this.props.initializeCandidateTags}
        getTagFormId={this.getTagFormId}
        userLevel={this.props.userLevel}
        deletable
        deleteTag={this.props.deleteTagToArticle}
        tags={this.props.tags[this.props.articleId]}
        />
    );
  }
});

const mapStateToProps = function (state) {
  return {
    userLevel: state.userInfo.userLevel,
    candidates: state.tag.candidate.byTagFormId,
    tags: state.tag.attached.articles
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    deleteTagToArticle: (articleId, tagName) => deleteTagToArticle(dispatch, articleId, tagName),
    addTagToArticle: (articleId, tagName) => addTagToArticle(dispatch, articleId, tagName),
    initializeCandidateTags: tagFormId => initializeCandidateTags(dispatch, tagFormId),
    loadCandidateTags: (tagFormId, query) => loadCandidateTags(dispatch, tagFormId, query)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleTagBox);
