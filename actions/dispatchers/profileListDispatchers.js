import {DataCon, Url} from '../../utils';
import * as types from '../actionTypes';

export function loadProfileList(dispatch) {
  DataCon.loadDataFromServer(Url.getUrl('profiles')).then(data => {
    dispatch({
      type: types.LOAD_PROFILE_LIST,
      profileList: data.profiles
    });
  }).catch(console.error);
}
