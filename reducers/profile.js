import {LOAD_PROFILE_DETAIL, UPDATE_FOLLOWING_STATE, LOAD_ALL_PROFILES} from '../actions/actionTypes';
import {updateObject, createReducer} from './common';

const PROFILE_INITIAL_STATE = {
  current: {
    following: false,
    name: '',
    description: ''
  },
  allProfiles: []
};

function loadProfileDetail(state, action) {
  return updateObject(state, {
    current: action.current
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

const profile = createReducer(PROFILE_INITIAL_STATE, {
  [LOAD_PROFILE_DETAIL]: loadProfileDetail,
  [UPDATE_FOLLOWING_STATE]: updateFollowingState,
  [LOAD_ALL_PROFILES]: loadAllProfiles
});

export default profile;
