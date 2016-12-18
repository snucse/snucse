import {
  LOAD_PROFILE_COMMENT_REPLY,
  SET_LAST_PROFILE_COMMENT_REPLY,
  MODIFY_FOLD_PROFILE_COMMENT_REPLY,
  WRITE_PROFILE_COMMENT_REPLY,
  EDIT_PROFILE_COMMENT_REPLY,
  DELETE_PROFILE_COMMENT_REPLY
} from '../../actions/actionTypes';
import {updateObject, updateItemInArray, createReducer} from '../common';

const PROFILE_COMMENT_REPLY_INITIAL_STATE = {
  replies: {
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
  return updateObject(state.replies, {[parentCommentId]: newReplies});
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
  const {parentCommentId, replies} = action;

  let ret = updateObject(state, {
    replies: updateReplies(state, parentCommentId, replies),
    count: updateCount(state, parentCommentId, replies.length),
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
    replies: updateReplies(state, parentCommentId, [comment]),
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
  const nestedReplies = state.replies[parentCommentId].concat([comment]);
  return updateObject(state, {
    replies: updateReplies(state, parentCommentId, nestedReplies),
    count: updateCount(state, parentCommentId, loaded ? nestedReplies.length : state.count[parentCommentId] + 1)
  });
}

function editReply(state, action) {
  const {parentCommentId, comment} = action;
  // 찾아서 대체 // map 사용
  const nestedReplies = updateItemInArray(
    state.replies[parentCommentId],
    'id',
    comment.id,
    () => comment
  );
  return updateObject(state, {
    replies: updateReplies(state, parentCommentId, nestedReplies)
  });
}

function deleteReply(state, action) {
  const {parentCommentId, commentId} = action;
  const loaded = state.loaded[parentCommentId];
  // 찾아서 삭제 // filter
  const nestedReplies = state.replies[parentCommentId].filter(comment => {
    return comment.id !== commentId;
  });
  return updateObject(state, {
    replies: updateReplies(state, parentCommentId, nestedReplies),
    count: updateCount(state, parentCommentId, loaded ? nestedReplies.length : state.count[parentCommentId] - 1)
  });
}

export default createReducer(PROFILE_COMMENT_REPLY_INITIAL_STATE, {
  [LOAD_PROFILE_COMMENT_REPLY]: loadReply,
  [SET_LAST_PROFILE_COMMENT_REPLY]: setLastReply,
  [MODIFY_FOLD_PROFILE_COMMENT_REPLY]: modifyFoldReply,
  [WRITE_PROFILE_COMMENT_REPLY]: writeReply,
  [EDIT_PROFILE_COMMENT_REPLY]: editReply,
  [DELETE_PROFILE_COMMENT_REPLY]: deleteReply
});
