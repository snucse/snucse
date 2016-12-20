import {DataCon, Url} from '../../utils';
import * as types from '../actionTypes';
import {updateFollowingList, loadTagCloud} from './';

export function loadUserInfo(dispatch) {
  DataCon.loadDataFromServer(Url.getUrl('/users/me')).then(data => {
    dispatch({
      type: types.LOAD_USER_INFO,
      userId: data.id,
      userLevel: data.level,
      name: data.name,
      username: data.username,
      profileImageUri: data.profileImageUri
    });
    return data.level;
  }).then(() => {
    updateFollowingList(dispatch);
    loadTagCloud(dispatch);
  }).catch(console.error);
}
