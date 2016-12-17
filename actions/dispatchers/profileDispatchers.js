import {DataCon, Url} from '../../utils';
import * as types from '../actionTypes';
import {loadProfileTag, updateFollowingList} from './';

export function loadAllProfiles(dispatch) {
  DataCon.loadDataFromServer(Url.getUrl('/profiles')).then(data => {
    dispatch({
      type: types.LOAD_ALL_PROFILES,
      allProfiles: data.profiles
    });
  }).catch(console.error);
}

export function loadProfileDetail(dispatch, id) {
  DataCon.loadDataFromServer(Url.getUrl(`/profiles/${id}`)).then(current => {
    dispatch({
      type: types.LOAD_PROFILE_DETAIL,
      current
    });
    return current;
  }).then(current => {
    const {id, tags} = current;
    loadProfileTag(dispatch, id, tags);
  }).catch(console.error);
}

export function updateFollowingState(dispatch, id, following) {
  const type = following ? 'follow' : 'unfollow';
  DataCon.postDataToServer(Url.getUrl(`/profiles/${id}/${type}`), 'POST').then(() => {
    dispatch({
      type: types.UPDATE_FOLLOWING_STATE,
      following
    });
  }).then(() => {
    updateFollowingList(dispatch);
  }).catch(console.error);
}

export function editProfileName(dispatch, id, newName) {
  DataCon.postDataToServer(Url.getUrl(`/profiles/${id}`), 'PUT', {
    name: newName
  }).then(() => {
    dispatch({
      type: types.LOAD_PROFILE_DETAIL,
      current: {
        name: newName
      }
    });
  }).then(() => {
    updateFollowingList(dispatch);
  }).catch(console.error);
}

export function editProfileDesc(dispatch, id, newDesc) {
  DataCon.postDataToServer(Url.getUrl(`/profiles/${id}`), 'PUT', {
    description: newDesc
  }).then(() => {
    dispatch({
      type: types.LOAD_PROFILE_DETAIL,
      current: {
        description: newDesc
      }
    });
  }).catch(console.error);
}

export function initProfileAdminError(dispatch) {
  dispatch({
    type: types.PROFILE_ERROR_INIT
  });
}

export function changeAdmin(dispatch, id, newId) {
  DataCon.postDataToServer(Url.getUrl(`/profiles/${id}/transfer`), 'POST', {
    adminId: newId
  }).then(() => {
    loadProfileDetail(dispatch, id);
  }).catch(err => {
    console.log(err);
    if (err.status === 401) {
      dispatch({
        type: types.PROFILE_ERROR_NOT_ADMIN
      });
    } else {
      dispatch({
        type: types.PROFILE_ERROR_INVALID_ID
      });
    }
  });
}
