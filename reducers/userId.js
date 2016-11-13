import {LOAD_USER_ID} from '../actions/actionTypes';
import {updateObject, createReducer} from './common';

const USER_ID_INITIAL_STATE = {
  userId: 0
};

function loadUserId(state, action) {
  return updateObject(state, {
    userId: action.userId
  });
}

export default createReducer(USER_ID_INITIAL_STATE, {
  [LOAD_USER_ID]: loadUserId
});
