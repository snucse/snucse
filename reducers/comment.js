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

function loadComment(state, action) {
  const newComments = {};
  newComments[action.articleId] = action.comments;
  const comments = updateObject(state.comments, newComments);
  return updateObject(state, {
    comments
  });
}

function writeComment(state, action) {
  const nestedComments = state.comments[action.articleId].concat([action.comment]);
  const newComments = {};
  newComments[action.articleId] = nestedComments;
  const comments = updateObject(state.comments, newComments);
  return updateObject(state, {
    comments
  });
}

function editComment(state, action) {
  // 찾아서 대체 // map 사용
  const nestedComments = updateItemInArray(
      state.comments[action.articleId],
      'id',
      action.comment.id,
      () => action.comment
      );
  const newComments = {};
  newComments[action.articleId] = nestedComments;
  const comments = updateObject(state.comments, newComments);
  return updateObject(state, {
    comments
  });
}

function deleteComment(state, action) {
  // 찾아서 삭제 // filter
  const nestedComments = state.comments[action.articleId].filter(comment => {
    return comment.id !== action.commentId;
  });
  const newComments = {};
  newComments[action.articleId] = nestedComments;
  const comments = updateObject(state.comments, newComments);
  return updateObject(state, {
    comments
  });
}

const comment = createReducer(COMMENT_INITIAL_STATE, {
  [LOAD_COMMENT]: loadComment,
  [WRITE_COMMENT]: writeComment,
  [EDIT_COMMENT]: editComment,
  [DELETE_COMMENT]: deleteComment
});

export default comment;
