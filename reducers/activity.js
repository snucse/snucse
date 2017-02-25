import {
  LOAD_ACTIVITY,
  LOAD_ACTIVITY_SUCCESS,
  LOAD_ACTIVITY_ERROR
} from '../actions/actionTypes';
import {updateObject, createReducer} from './common';

const ACTIVITY_INITIAL_STATE = {
  activities: [],
  loading: false,
  isError: false
};

function load(state) {
  return updateObject(state, {loading: true, isError: false});
}

function success(state, action) {
  const {count, activities} = action;
  return updateObject(state, {count, activities, loading: false});
}

function fail(state) {
  return updateObject(state, {loading: false, isError: true});
}

export default createReducer(ACTIVITY_INITIAL_STATE, {
  [LOAD_ACTIVITY]: load,
  [LOAD_ACTIVITY_SUCCESS]: success,
  [LOAD_ACTIVITY_ERROR]: fail
});
