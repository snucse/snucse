import {LOAD_PROFILE_DETAIL, CLEAR_PROFILE_DETAIL, ERR_PROFILE_DETAIL, UPDATE_FOLLOWING_STATE, LOAD_ALL_PROFILES} from '../actions/actionTypes';
import {updateObject, createReducer} from './common';

const PROFILE_INITIAL_STATE = {
  current: {
    following: false,
    name: '',
    description: '',
    loading: true
  },
  allProfiles: []
};

function loadProfileDetail(state, action) {
  return updateObject(state, {
    current: updateObject(state.current, {
      ...action.current,
      loading: false
    })
  });
}

function clearProfileDetail(state) {
  return updateObject(state, {
    current: PROFILE_INITIAL_STATE.current
  });
}

function errProfileDetail(state) {
  return updateObject(state, {
    current: updateObject(PROFILE_INITIAL_STATE.current, {loading: false})
  });
}

function updateFollowingState(state, action) {
  const current = updateObject(state.current, {
    following: action.following
  });
  return updateObject(state, {
    current
  });
}

function loadAllProfiles(state, action) {
  return updateObject(state, {
    allProfiles: action.allProfiles
  });
}

export default createReducer(PROFILE_INITIAL_STATE, {
  [LOAD_PROFILE_DETAIL]: loadProfileDetail,
  [CLEAR_PROFILE_DETAIL]: clearProfileDetail,
  [ERR_PROFILE_DETAIL]: errProfileDetail,
  [UPDATE_FOLLOWING_STATE]: updateFollowingState,
  [LOAD_ALL_PROFILES]: loadAllProfiles
});
