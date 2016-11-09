import {DataCon, Url} from '../../utils';
import {loadProfileTag, updateFollowingList} from '../dispatchers';
import * as types from '../actionTypes';

export function loadAllProfiles(dispatch) {
  DataCon.loadDataFromServer(Url.getUrl('profiles')).then(data => {
    dispatch({
      type: types.LOAD_ALL_PROFILES,
      allProfiles: data.profiles
    });
  }).catch(console.error);
}

export function loadProfileDetail(dispatch, id) {
  DataCon.loadDataFromServer(Url.getUrl(`profiles/${id}`)).then(current => {
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
  DataCon.postDataToServer(Url.getUrl(`profiles/${id}/${type}`), 'POST').then(() => {
    dispatch({
      type: types.UPDATE_FOLLOWING_STATE,
      following
    });
  }).then(() => {
    updateFollowingList(dispatch);
  }).catch(console.error);
}
