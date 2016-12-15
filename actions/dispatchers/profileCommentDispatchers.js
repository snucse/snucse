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

export function setLastProfileComment(dispatch, id, comment, commentCount) {
  dispatch({
    type: types.SET_LAST_PROFILE_COMMENT,
    profileId: id,
    comment,
    commentCount
  });
}

export function modifyFoldProfileComments(dispatch, id, fold) {
  dispatch({
    type: types.MODIFY_FOLD_PROFILE_COMMENT,
    profileId: id,
    fold
  });
}

export function writeProfileComment(dispatch, profileId, content) {
  const data = {
    profileId,
    content
  };
  DataCon.postDataToServer(Url.getUrl('/profile_comments'), 'POST', data).then(res => {
    dispatch({
      type: types.WRITE_PROFILE_COMMENT,
      comment: res,
      profileId
    });
  }).catch(console.error);
}

export function editProfileComment(dispatch, commentId, profileId, newContent) {
  DataCon.postDataToServer(Url.getUrl(`/profile_comments/${commentId}`), 'PUT', {
    content: newContent
  }).then(comment => {
    dispatch({
      type: types.EDIT_PROFILE_COMMENT,
      comment,
      profileId
    });
  }).catch(console.error);
}

export function deleteProfileComment(dispatch, commentId, profileId) {
  DataCon.postDataToServer(Url.getUrl(`/profile_comments/${commentId}`), 'DELETE').then(() => {
    dispatch({
      type: types.DELETE_PROFILE_COMMENT,
      commentId,
      profileId
    });
  }).catch(console.error);
}
