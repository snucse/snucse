import {browserHistory} from 'react-router';
import {DataCon, Url} from '../../utils';
import * as types from '../actionTypes';
import {loadProfileTag, updateFollowingList, alertModal} from './';

export function loadAllProfiles(dispatch) {
  DataCon.loadDataFromServer(Url.getUrl('/profiles')).then(data => {
    dispatch({
      type: types.LOAD_ALL_PROFILES,
      allProfiles: data.profiles
    });
  }).catch(console.error);
}

export function clearProfileDetail(dispatch) {
  dispatch({
    type: types.CLEAR_PROFILE_DETAIL
  });
}

export function loadProfileDetail(dispatch, id) {
  clearProfileDetail(dispatch);
  DataCon.loadDataFromServer(Url.getUrl(`/profiles/${id}`)).then(current => {
    dispatch({
      type: types.LOAD_PROFILE_DETAIL,
      current
    });
    return current;
  }).then(current => {
    const {id, tags} = current;
    loadProfileTag(dispatch, id, tags);
  }).catch(err => {
    console.error(err);
    dispatch({
      type: types.ERR_PROFILE_DETAIL
    });
    alertModal(dispatch, '알림', '존재하지 않는 프로필입니다.', () => {
      browserHistory.goBack();
    });
  });
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

export function changeAdmin(dispatch, id, newId) {
  DataCon.postDataToServer(Url.getUrl(`/profiles/${id}/transfer`), 'POST', {
    adminId: newId
  }).then(() => {
    loadProfileDetail(dispatch, id);
  }).catch(err => {
    console.error(err);
    if (err.status === 401) {
      alertModal(dispatch, '알림', '관리자가 아닙니다');
    } else {
      alertModal(dispatch, '알림', '해당하는 id를 찾을 수 없습니다.');
    }
  });
}
