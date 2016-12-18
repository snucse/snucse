import {LOAD_USER_INFO} from '../actions/actionTypes';
import {updateObject, createReducer} from './common';

const USER_INFO_INITIAL_STATE = {
  userId: 0,
  userLevel: 0
};

function loadUserInfo(state, action) {
  const {userId, userLevel, name, username, profileImageUri} = action;
  return updateObject(state, {
    userId,
    userLevel,
    name,
    username,
    profileImageUri
  });
}

export default createReducer(USER_INFO_INITIAL_STATE, {
  [LOAD_USER_INFO]: loadUserInfo
});
