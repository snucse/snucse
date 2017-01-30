import {
  LOAD_PROFILE_COMMENT,
  SET_LAST_PROFILE_COMMENT,
  MODIFY_FOLD_PROFILE_COMMENT,
  WRITE_PROFILE_COMMENT,
  EDIT_PROFILE_COMMENT,
  DELETE_PROFILE_COMMENT
} from '../../actions/actionTypes';
import {updateObject, updateItemInArray, createReducer} from '../common';

const PROFILE_COMMENT_INITIAL_STATE = {
  comments: {
    /*
    profileId: [
      {},
      {},
    ]
    */
  },
  count: {},
  loaded: {},
  fold: {}
};

function updateComments(state, profileId, newComments) {
  return updateObject(state.comments, {[profileId]: newComments});
}

function updateCount(state, profileId, newCount) {
  return updateObject(state.count, {[profileId]: newCount});
}

function updateLoaded(state, profileId, newLoaded) {
  return updateObject(state.loaded, {[profileId]: newLoaded});
}

function updateFold(state, profileId, newFold) {
  return updateObject(state.fold, {[profileId]: newFold});
}

function loadComment(state, action) {
  const {profileId, comments} = action;

  let ret = updateObject(state, {
    comments: updateComments(state, profileId, comments),
    count: updateCount(state, profileId, comments.length),
    loaded: updateLoaded(state, profileId, true)
  });

  if (!(profileId in state.fold)) {
    ret = updateObject(ret, {
      fold: updateFold(state, profileId, true)
    });
  }

  return ret;
}

function setLastComment(state, action) {
  const {profileId, comment, commentCount} = action;
  console.log(comment);
  if (comment !== null) {
    return updateObject(state, {
      comments: updateComments(state, profileId, [comment]),
      count: updateCount(state, profileId, commentCount),
      loaded: updateLoaded(state, profileId, false),
      fold: updateFold(state, profileId, false)
    });
  }
  return updateObject(state, {
    comments: updateComments(state, profileId, []),
    count: updateCount(state, profileId, 0),
    loaded: updateLoaded(state, profileId, true),
    fold: updateFold(state, profileId, false)
  });
}

function modifyFoldComment(state, action) {
  const {profileId, fold} = action;
  return updateObject(state, {
    fold: updateFold(state, profileId, fold)
  });
}

function writeComment(state, action) {
  const {profileId, comment} = action;
  const loaded = state.loaded[profileId];
  // 끝에 추가 // concat
  const nestedComments = state.comments[profileId].concat([comment]);
  return updateObject(state, {
    comments: updateComments(state, profileId, nestedComments),
    count: updateCount(state, profileId, loaded ? nestedComments.length : state.count[profileId] + 1)
  });
}

function editComment(state, action) {
  const {profileId, comment} = action;
  // 찾아서 대체 // map 사용
  const nestedComments = updateItemInArray(
    state.comments[profileId],
    'id',
    comment.id,
    () => comment
  );
  return updateObject(state, {
    comments: updateComments(state, profileId, nestedComments)
  });
}

function deleteComment(state, action) {
  const {profileId, commentId} = action;
  const loaded = state.loaded[profileId];
  // 찾아서 삭제 // filter
  const nestedComments = state.comments[profileId].filter(comment => {
    return comment.id !== commentId;
  });
  return updateObject(state, {
    comments: updateComments(state, profileId, nestedComments),
    count: updateCount(state, profileId, loaded ? nestedComments.length : state.count[profileId] - 1)
  });
}

export default createReducer(PROFILE_COMMENT_INITIAL_STATE, {
  [LOAD_PROFILE_COMMENT]: loadComment,
  [SET_LAST_PROFILE_COMMENT]: setLastComment,
  [MODIFY_FOLD_PROFILE_COMMENT]: modifyFoldComment,
  [WRITE_PROFILE_COMMENT]: writeComment,
  [EDIT_PROFILE_COMMENT]: editComment,
  [DELETE_PROFILE_COMMENT]: deleteComment
});
