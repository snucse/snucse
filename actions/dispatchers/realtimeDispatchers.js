import * as types from '../actionTypes';

export function updateTimes(dispatch) {
  dispatch({
    type: types.UPDATE_TIMES,
    timestamp: Date.now()
  });
}
