import {LOAD_COMMENT, SET_LAST_COMMENT, MODIFY_FOLD_COMMENT, WRITE_COMMENT, EDIT_COMMENT, DELETE_COMMENT} from '../../actions/actionTypes';
import {updateObject, updateItemInArray, createReducer} from '../common';

const ARTICLE_COMMENT_INITIAL_STATE = {
  comments: {
    /*
    articleId: [
      {},
      {},
    ]
    */
  },
  count: {},
  loaded: {},
  fold: {}
};

function updateComments(state, articleId, newComments) {
  return updateObject(state.comments, {[articleId]: newComments});
}

function updateCount(state, articleId, newCount) {
  return updateObject(state.count, {[articleId]: newCount});
}

function updateLoaded(state, articleId, newLoaded) {
  return updateObject(state.loaded, {[articleId]: newLoaded});
}

function updateFold(state, articleId, newFold) {
  return updateObject(state.fold, {[articleId]: newFold});
}

function loadComment(state, action) {
  const {articleId, comments} = action;

  let ret = updateObject(state, {
    comments: updateComments(state, articleId, comments),
    count: updateCount(state, articleId, comments.length),
    loaded: updateLoaded(state, articleId, true)
  });

  if (!(articleId in state.fold)) {
    ret = updateObject(ret, {
      fold: updateFold(state, articleId, true)
    });
  }

  return ret;
}

function setLastComment(state, action) {
  const {articleId, comment, commentCount} = action;
  return updateObject(state, {
    comments: updateComments(state, articleId, [comment]),
    count: updateCount(state, articleId, commentCount),
    loaded: updateLoaded(state, articleId, false),
    fold: updateFold(state, articleId, false)
  });
}

function modifyFoldComment(state, action) {
  const {articleId, fold} = action;
  return updateObject(state, {
    fold: updateFold(state, articleId, fold)
  });
}

function writeComment(state, action) {
  const {articleId, comment} = action;
  const loaded = state.loaded[articleId];
  // 끝에 추가 // concat
  const nestedComments = state.comments[articleId].concat([comment]);
  return updateObject(state, {
    comments: updateComments(state, articleId, nestedComments),
    count: updateCount(state, articleId, loaded ? nestedComments.length : state.count[articleId] + 1)
  });
}

function editComment(state, action) {
  const {articleId, comment} = action;
  // 찾아서 대체 // map 사용
  const nestedComments = updateItemInArray(
    state.comments[articleId],
    'id',
    comment.id,
    () => comment
  );
  return updateObject(state, {
    comments: updateComments(state, articleId, nestedComments)
  });
}

function deleteComment(state, action) {
  const {articleId, commentId} = action;
  const loaded = state.loaded[articleId];
  // 찾아서 삭제 // filter
  const nestedComments = state.comments[articleId].filter(comment => {
    return comment.id !== commentId;
  });
  return updateObject(state, {
    comments: updateComments(state, articleId, nestedComments),
    count: updateCount(state, articleId, loaded ? nestedComments.length : state.count[articleId] - 1)
  });
}

export default createReducer(ARTICLE_COMMENT_INITIAL_STATE, {
  [LOAD_COMMENT]: loadComment,
  [SET_LAST_COMMENT]: setLastComment,
  [MODIFY_FOLD_COMMENT]: modifyFoldComment,
  [WRITE_COMMENT]: writeComment,
  [EDIT_COMMENT]: editComment,
  [DELETE_COMMENT]: deleteComment
});
