import * as types from './actionTypes'

// action related with Post component
export function loadInitialPost(data){
  return {
    type: types.LOAD_INITIAL_POST,
    data: data,
  };
};

export function loadPost(data){
  return {
    type: types.LOAD_POST,
    data: data,
  };
};

export function scrollPostListEnd(){
  return {
    type: types.SCROLL_POST_LIST_END,
  };
};

// action related with comment
export function loadComments(articleId, comments){
  return {
    type: types.LOAD_COMMENT,
    comments: comments,
    articleId: articleId,
  };
};

export function writeComment(articleId, comment){
  return {
    type: types.WRITE_COMMENT,
    comment: comment,
    articleId: articleId,
  };
};

export function editComment(articleId, comment){
  return {
    type: types.EDIT_COMMENT,
    comment: comment,
    articleId: articleId,
  };
};

export function deleteComment(articleId, commentId){
  return {
    type: types.DELETE_COMMENT,
    commentId: commentId,
    articleId: articleId,
  };
};

// action related with user id
export function loadUserId(userId){
  return {
    type: types.LOAD_USER_ID,
    userId: userId,
  };
};
