import {DataCon, Url} from '../../utils';
import * as types from '../actionTypes';

export function loadUserInfo(dispatch) {
  DataCon.loadDataFromServer(Url.getUrl('users/me')).then(data => {
    dispatch({
      type: types.LOAD_USER_INFO,
      userId: data.id,
      userLevel: data.level
    });
  }).catch(console.error);
}
