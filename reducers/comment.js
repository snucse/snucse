import {LOAD_COMMENT, WRITE_COMMENT, EDIT_COMMENT, DELETE_COMMENT} from '../actions/actionTypes';
import {updateObject, updateItemInArray, createReducer} from './common';

const COMMENT_INITIAL_STATE = {
  comments: {
    /*
    articleId: [
      {},
      {},
    ]
    */
  }
};

function updateComments(state, articleId, newComments) {
  const comments = updateObject(state.comments, {[articleId]: newComments});
  return updateObject(state, {comments});
}

function loadComment(state, action) {
  return updateComments(state, action.articleId, action.comments);
}

function writeComment(state, action) {
  const nestedComments = state.comments[action.articleId].concat([action.comment]);
  return updateComments(state, action.articleId, nestedComments);
}

function editComment(state, action) {
  // 찾아서 대체 // map 사용
  const nestedComments = updateItemInArray(
      state.comments[action.articleId],
      'id',
      action.comment.id,
      () => action.comment
      );
  return updateComments(state, action.articleId, nestedComments);
}

function deleteComment(state, action) {
  // 찾아서 삭제 // filter
  const nestedComments = state.comments[action.articleId].filter(comment => {
    return comment.id !== action.commentId;
  });
  return updateComments(state, action.articleId, nestedComments);
}

export default createReducer(COMMENT_INITIAL_STATE, {
  [LOAD_COMMENT]: loadComment,
  [WRITE_COMMENT]: writeComment,
  [EDIT_COMMENT]: editComment,
  [DELETE_COMMENT]: deleteComment
});
