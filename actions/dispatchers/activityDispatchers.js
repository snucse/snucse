import {DataCon, Url} from '../../utils';
import * as types from '../actionTypes';

export function loadActivity(dispatch, options) {
  dispatch({
    type: types.LOAD_ACTIVITY
  });
  // options: {profileId, filterType, filterAction, page, limit}
  // todo options 제약을 여기서 걸어야 하나?
  const page = options.page || 0;
  options.page = parseInt(page, 10) + 1;
  DataCon.loadDataFromServer(Url.getUrl('/activities', options)).then(response => {
    dispatch({
      type: types.LOAD_ACTIVITY_SUCCESS,
      activities: response.activities,
      count: response.count
    });
  }).catch(err => {
    console.error(err);
    dispatch({
      type: types.LOAD_ACTIVITY_ERROR
    });
  });
}
