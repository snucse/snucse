import {PROFILE_ERROR_INIT, PROFILE_ERROR_INVALID_ID, PROFILE_ERROR_NOT_ADMIN} from '../actions/actionTypes';
import {updateObject, createReducer} from './common';

const PROFILE_ADMIN_INITIAL_STATE = {
  notAdmin: false,
  invalidId: false
};

function profileErrorInit() {
  return PROFILE_ADMIN_INITIAL_STATE;
}

function profileErrorInvalidId(state) {
  return updateObject(state, {
    invalidId: true
  });
}

function profileErrorNotAdmin(state) {
  return updateObject(state, {
    notAdmin: true
  });
}

export default createReducer(PROFILE_ADMIN_INITIAL_STATE, {
  [PROFILE_ERROR_INIT]: profileErrorInit,
  [PROFILE_ERROR_NOT_ADMIN]: profileErrorNotAdmin,
  [PROFILE_ERROR_INVALID_ID]: profileErrorInvalidId
});
