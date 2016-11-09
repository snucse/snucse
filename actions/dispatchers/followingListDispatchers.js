import {DataCon, Url} from '../../utils';
import * as types from '../actionTypes';

export function updateFollowingList(dispatch) {
  DataCon.loadDataFromServer(Url.getUrl('profiles/following')).then(data => {
    dispatch({
      type: types.UPDATE_FOLLOWING,
      profiles: data.profiles
    });
  }).catch(console.error);
}
