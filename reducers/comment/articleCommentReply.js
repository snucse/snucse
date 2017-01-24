import {
  LOAD_COMMENT_REPLY,
  SET_LAST_COMMENT_REPLY,
  MODIFY_FOLD_COMMENT_REPLY,
  WRITE_COMMENT_REPLY,
  EDIT_COMMENT_REPLY,
  DELETE_COMMENT_REPLY
} from '../../actions/actionTypes';
import {updateObject, updateItemInArray, createReducer} from '../common';

const COMMENT_REPLY_INITIAL_STATE = {
  comments: {
    /*
    parentCommentId: [
      {},
      {},
    ]
    */
  },
  count: {},
  loaded: {},
  fold: {}
};

function updateReplies(state, parentCommentId, newReplies) {
  return updateObject(state.comments, {[parentCommentId]: newReplies});
}

function updateCount(state, parentCommentId, newCount) {
  return updateObject(state.count, {[parentCommentId]: newCount});
}

function updateLoaded(state, parentCommentId, newLoaded) {
  return updateObject(state.loaded, {[parentCommentId]: newLoaded});
}

function updateFold(state, parentCommentId, newFold) {
  return updateObject(state.fold, {[parentCommentId]: newFold});
}

function loadReply(state, action) {
  const {parentCommentId, comments} = action;

  let ret = updateObject(state, {
    comments: updateReplies(state, parentCommentId, comments),
    count: updateCount(state, parentCommentId, comments.length),
    loaded: updateLoaded(state, parentCommentId, true)
  });

  if (!(parentCommentId in state.fold)) {
    ret = updateObject(ret, {
      fold: updateFold(state, parentCommentId, true)
    });
  }

  return ret;
}

function setLastReply(state, action) {
  const {parentCommentId, comment, commentCount} = action;
  return updateObject(state, {
    comments: updateReplies(state, parentCommentId, [comment]),
    count: updateCount(state, parentCommentId, commentCount),
    loaded: updateLoaded(state, parentCommentId, false),
    fold: updateFold(state, parentCommentId, false)
  });
}

function modifyFoldReply(state, action) {
  const {parentCommentId, fold} = action;
  return updateObject(state, {
    fold: updateFold(state, parentCommentId, fold)
  });
}

function writeReply(state, action) {
  const {parentCommentId, comment} = action;
  const loaded = state.loaded[parentCommentId];
  // 끝에 추가 // concat
  const nestedReplies = state.comments[parentCommentId].concat([comment]);
  return updateObject(state, {
    comments: updateReplies(state, parentCommentId, nestedReplies),
    count: updateCount(state, parentCommentId, loaded ? nestedReplies.length : state.count[parentCommentId] + 1)
  });
}

function editReply(state, action) {
  const {parentCommentId, comment} = action;
  // 찾아서 대체 // map 사용
  const nestedReplies = updateItemInArray(
    state.comments[parentCommentId],
    'id',
    comment.id,
    () => comment
  );
  return updateObject(state, {
    comments: updateReplies(state, parentCommentId, nestedReplies)
  });
}

function deleteReply(state, action) {
  const {parentCommentId, commentId} = action;
  const loaded = state.loaded[parentCommentId];
  // 찾아서 삭제 // filter
  const nestedReplies = state.comments[parentCommentId].filter(comment => {
    return comment.id !== commentId;
  });
  return updateObject(state, {
    comments: updateReplies(state, parentCommentId, nestedReplies),
    count: updateCount(state, parentCommentId, loaded ? nestedReplies.length : state.count[parentCommentId] - 1)
  });
}

export default createReducer(COMMENT_REPLY_INITIAL_STATE, {
  [LOAD_COMMENT_REPLY]: loadReply,
  [SET_LAST_COMMENT_REPLY]: setLastReply,
  [MODIFY_FOLD_COMMENT_REPLY]: modifyFoldReply,
  [WRITE_COMMENT_REPLY]: writeReply,
  [EDIT_COMMENT_REPLY]: editReply,
  [DELETE_COMMENT_REPLY]: deleteReply
});
