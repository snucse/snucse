import {DataCon, Url} from '../../utils';
import {loadProfileTag, updateFollowingList} from '../dispatchers';
import * as types from '../actionTypes';

export function loadProfileDetail(dispatch, id) {
  DataCon.loadDataFromServer(Url.getUrl(`profiles/${id}`)).then(data => {
    dispatch({
      type: types.LOAD_PROFILE_DETAIL,
      data
    });
    return data;
  }).then(data => {
    loadProfileTag(dispatch, data.id, data.tags);
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
