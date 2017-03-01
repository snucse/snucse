import {updateObject, updateItemInArray, createReducer} from '../common';

export default (actionTypes, parentId) => {
  const INITIAL_STATE = {
    comments: {},
    count: {},
    loaded: {},
    fold: {}
  };

  function updateComments(state, id, newComment) {
    return updateObject(state.comments, {[id]: newComment});
  }

  function updateCount(state, id, newCount) {
    return updateObject(state.count, {[id]: newCount});
  }

  function updateLoaded(state, id, newLoaded) {
    return updateObject(state.loaded, {[id]: newLoaded});
  }

  function updateFold(state, id, newFold) {
    return updateObject(state.fold, {[id]: newFold});
  }

  function loadComments(state, action) {
    const id = action[parentId];
    const {comments} = action;

    let retval = updateObject(state, {
      comments: updateComments(state, id, comments),
      count: updateCount(state, id, comments.length),
      loaded: updateLoaded(state, id, true)
    });

    if (!(id in state.fold)) {
      retval = updateObject(retval, {
        fold: updateFold(state, id, true)
      });
    }

    return retval;
  }

  function setLastComment(state, action) {
    const id = action[parentId];
    const {comment, commentCount} = action;
    if (comment !== null && comment !== undefined) {
      return updateObject(state, {
        comments: updateComments(state, id, [comment]),
        count: updateCount(state, id, commentCount),
        loaded: updateLoaded(state, id, false),
        fold: updateFold(state, id, false)
      });
    }
    return updateObject(state, {
      comments: updateComments(state, id, []),
      count: updateCount(state, id, 0),
      loaded: updateLoaded(state, id, true),
      fold: updateFold(state, id, false)
    });
  }

  function modifyFoldComment(state, action) {
    const id = action[parentId];
    const {fold} = action;
    return updateObject(state, {
      fold: updateFold(state, id, fold)
    });
  }

  function writeComment(state, action) {
    const id = action[parentId];
    const {comment} = action;
    const loaded = state.loaded[id];
    // 끝에 추가 // concat
    const nestedComments = state.comments[id].concat([comment]);
    return updateObject(state, {
      comments: updateComments(state, id, nestedComments),
      count: updateCount(state, id, loaded ? nestedComments.length : state.count[id] + 1)
    });
  }

  function editComment(state, action) {
    const id = action[parentId];
    const {comment} = action;
    // 찾아서 대체 // map 사용
    const nestedComments = updateItemInArray(
      state.comments[id],
      'id',
      comment.id,
      () => comment
    );
    return updateObject(state, {
      comments: updateComments(state, id, nestedComments)
    });
  }

  function deleteComment(state, action) {
    const id = action[parentId];
    const {commentId} = action;
    const loaded = state.loaded[id];
    // 찾아서 삭제 // filter
    const nestedComments = state.comments[id].filter(comment => {
      return comment.id !== commentId;
    });
    return updateObject(state, {
      comments: updateComments(state, id, nestedComments),
      count: updateCount(state, id, loaded ? nestedComments.length : state.count[id] - 1)
    });
  }

  return createReducer(INITIAL_STATE, {
    [actionTypes.load]: loadComments,
    [actionTypes.setLast]: setLastComment,
    [actionTypes.modifyFold]: modifyFoldComment,
    [actionTypes.write]: writeComment,
    [actionTypes.edit]: editComment,
    [actionTypes.delete]: deleteComment
  });
};
