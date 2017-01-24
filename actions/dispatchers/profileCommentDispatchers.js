import {DataCon, Url} from '../../utils';
import * as types from '../actionTypes';

export function loadProfileComments(dispatch, profileId) {
  const url = Url.getUrl('/profile_comments', {profileId});
  DataCon.loadDataFromServer(url).then(data => {
    dispatch({
      type: types.LOAD_PROFILE_COMMENT,
      comments: data.profileComments,
      profileId
    });
  }).catch(console.error);
}

export function loadProfileCommentReplies(dispatch, parentCommentId) {
  DataCon.loadDataFromServer(Url.getUrl('/profile_comments/replies', {parentCommentId})).then(res => {
    dispatch({
      type: types.LOAD_PROFILE_COMMENT_REPLY,
      comments: res.profileComments,
      parentCommentId
    });
  }).catch(console.error);
}

export function setLastProfileComment(dispatch, id, comment, commentCount, isChild = false) {
  dispatch({
    type: isChild ? types.SET_LAST_PROFILE_COMMENT_REPLY : types.SET_LAST_PROFILE_COMMENT,
    [isChild ? 'parentCommentId' : 'profileId']: id,
    comment,
    commentCount
  });
}

export function modifyFoldProfileComments(dispatch, id, fold, isChild = false) {
  dispatch({
    type: isChild ? types.MODIFY_FOLD_PROFILE_COMMENT_REPLY : types.MODIFY_FOLD_PROFILE_COMMENT,
    [isChild ? 'parentCommentId' : 'profileId']: id,
    fold
  });
}

export function writeProfileComment(dispatch, profileId, content, parentCommentId) {
  const data = {
    profileId,
    content,
    parentCommentId
  };
  DataCon.postDataToServer(Url.getUrl('/profile_comments'), 'POST', data).then(res => {
    if (parentCommentId === undefined) {
      dispatch({
        type: types.WRITE_PROFILE_COMMENT,
        comment: res,
        profileId
      });
    } else {
      dispatch({
        type: types.WRITE_PROFILE_COMMENT_REPLY,
        comment: res,
        parentCommentId
      });
    }
  }).catch(console.error);
}

export function editProfileComment(dispatch, commentId, id, newContent, isChild = false) {
  DataCon.postDataToServer(Url.getUrl(`/profile_comments/${commentId}`), 'PUT', {
    content: newContent
  }).then(comment => {
    dispatch({
      type: isChild ? types.EDIT_PROFILE_COMMENT_REPLY : types.EDIT_PROFILE_COMMENT,
      comment,
      [isChild ? 'parentCommentId' : 'profileId']: id
    });
  }).catch(console.error);
}

export function deleteProfileComment(dispatch, commentId, id, isChild = false) {
  DataCon.postDataToServer(Url.getUrl(`/profile_comments/${commentId}`), 'DELETE').then(() => {
    dispatch({
      type: isChild ? types.DELETE_PROFILE_COMMENT_REPLY : types.DELETE_PROFILE_COMMENT,
      commentId,
      [isChild ? 'parentCommentId' : 'profileId']: id
    });
  }).catch(console.error);
}
