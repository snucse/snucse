import * as types from './actionTypes';

// action related with Post component
export function loadInitialPost(data) {
  return {
    type: types.LOAD_INITIAL_POST,
    data
  };
}

export function loadPost(data) {
  return {
    type: types.LOAD_POST,
    data
  };
}

export function scrollPostListEnd() {
  return {
    type: types.SCROLL_POST_LIST_END
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
