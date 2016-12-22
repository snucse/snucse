import * as types from '../actionTypes';

export function updateTimes(dispatch) {
  console.log('tick');
  dispatch({
    type: types.UPDATE_TIMES,
    timestamp: Date.now()
  });
}
