import * as types from './actionTypes';

export function loadProfileDetail(data) {
  return {
    type: types.LOAD_PROFILE_DETAIL,
    data
  };
}

export function updateFollowingState(following) {
  return {
    type: types.UPDATE_FOLLOWING_STATE,
    following
  };
}
