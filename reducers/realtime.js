import {UPDATE_TIMES} from '../actions/actionTypes';
import {updateObject, createReducer} from './common';

const REALTIME_INITIAL_STATE = {
  timestamp: 0
};

function updateTimes(state, action) {
  return updateObject(state, {timestamp: action.timestamp});
}

export default createReducer(REALTIME_INITIAL_STATE, {
  [UPDATE_TIMES]: updateTimes
});
