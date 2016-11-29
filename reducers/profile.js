import {MODIFY_PROFILE_LOADED_STATE, LOAD_PROFILE_DETAIL, UPDATE_FOLLOWING_STATE, LOAD_ALL_PROFILES} from '../actions/actionTypes';
import {updateObject, createReducer} from './common';

const PROFILE_INITIAL_STATE = {
  current: {
    following: false,
    name: '',
    description: ''
  },
  loaded: false,
  allProfiles: []
};

function modifyProfileLoadedState(state, action) {
  return updateObject(state, {
    loaded: action.loaded
  });
}

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

export default createReducer(PROFILE_INITIAL_STATE, {
  [MODIFY_PROFILE_LOADED_STATE]: modifyProfileLoadedState,
  [LOAD_PROFILE_DETAIL]: loadProfileDetail,
  [UPDATE_FOLLOWING_STATE]: updateFollowingState,
  [LOAD_ALL_PROFILES]: loadAllProfiles
});
