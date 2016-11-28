import {DataCon, Url, UserLevel} from '../../utils';
import * as types from '../actionTypes';
import {updateFollowingList, loadTagCloud} from './';

export function loadUserInfo(dispatch) {
  DataCon.loadDataFromServer(Url.getUrl('users/me')).then(data => {
    dispatch({
      type: types.LOAD_USER_INFO,
      userId: data.id,
      userLevel: data.level
    });
    return data.level;
  }).then(userLevel => {
    if (userLevel === UserLevel.REGULAR) {
      updateFollowingList(dispatch);
      loadTagCloud(dispatch);
    }
  }).catch(console.error);
}
