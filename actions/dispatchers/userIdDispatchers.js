import {DataCon, Url} from '../../utils';
import * as types from '../actionTypes';

export function loadUserId(dispatch) {
  DataCon.loadDataFromServer(Url.getUrl('/users/me')).then(data => {
    dispatch({
      type: types.LOAD_USER_ID,
      userId: data.id
    });
  }).catch(console.error);
}
