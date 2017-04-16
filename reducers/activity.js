import {
  LOAD_ACTIVITY,
  LOAD_ACTIVITY_SUCCESS,
  LOAD_ACTIVITY_ERROR,
  SEARCH_PROFILE_WITH_PREFIX_INIT,
  SEARCH_PROFILE_WITH_PREFIX_COMPLETE
} from '../actions/actionTypes';
import {updateObject, createReducer} from './common';

const ACTIVITY_INITIAL_STATE = {
  activities: [],
  loading: false,
  isError: false,
  autoComplete: {
    profiles: []
  }
};

function load(state) {
  return updateObject(state, {activities: [], count: undefined, loading: true, isError: false});
}

function success(state, action) {
  const {count, activities} = action;
  return updateObject(state, {count, activities, loading: false});
}

function fail(state) {
  return updateObject(state, {loading: false, isError: true});
}

function searchProfileWithPrefixInit(state) {
  const autoComplete = updateObject(state.autoComplete, {
    profiles: []
  });
  return updateObject(state, {
    autoComplete
  });
}
// fixme you can extract this like tag dispatcher
function searchProfileWithPrefixComplete(state, action) {
  const autoComplete = updateObject(state.autoComplete, {
    profiles: action.profiles
  });
  return updateObject(state, {
    autoComplete
  });
}

export default createReducer(ACTIVITY_INITIAL_STATE, {
  [LOAD_ACTIVITY]: load,
  [LOAD_ACTIVITY_SUCCESS]: success,
  [LOAD_ACTIVITY_ERROR]: fail,
  [SEARCH_PROFILE_WITH_PREFIX_INIT]: searchProfileWithPrefixInit,
  [SEARCH_PROFILE_WITH_PREFIX_COMPLETE]: searchProfileWithPrefixComplete
});
