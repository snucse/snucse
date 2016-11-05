import * as types from './actionTypes';

// action related with Article component
export function loadInitialArticle(data) {
  return {
    type: types.LOAD_INITIAL_ARTICLE,
    data
  };
}

export function loadArticle(data) {
  return {
    type: types.LOAD_ARTICLE,
    data
  };
}

export function scrollArticleListEnd() {
  return {
    type: types.SCROLL_ARTICLE_LIST_END
  };
}

export function onLoadArticle() {
  return {
    type: types.ON_LOADING_ARTICLE
  };
}

// action related with comment
export function loadComments(articleId, comments) {
  return {
    type: types.LOAD_COMMENT,
    comments,
    articleId
  };
}

export function writeComment(articleId, comment) {
  return {
    type: types.WRITE_COMMENT,
    comment,
    articleId
  };
}

export function editComment(articleId, comment) {
  return {
    type: types.EDIT_COMMENT,
    comment,
    articleId
  };
}

export function deleteComment(articleId, commentId) {
  return {
    type: types.DELETE_COMMENT,
    commentId,
    articleId
  };
}

// action related with user id
export function loadUserId(userId) {
  return {
    type: types.LOAD_USER_ID,
    userId
  };
}
