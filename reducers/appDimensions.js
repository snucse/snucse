import {UPDATE_APP_DIMENSIONS, UPDATE_MOBILE_STATE} from '../actions/actionTypes';
import {updateObject, createReducer} from './common';

const APP_DIMENSIONS_INITIAL_STATE = {
  dimensions: {
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },

  isMobile: false
};

function updateAppDimensions(state, action) {
  return updateObject(state, {dimensions: action.dimensions});
}

function updatesIsMobile(state, action) {
  return updateObject(state, {isMobile: action.isMobile});
}

export default createReducer(APP_DIMENSIONS_INITIAL_STATE, {
  [UPDATE_APP_DIMENSIONS]: updateAppDimensions,
  [UPDATE_MOBILE_STATE]: updatesIsMobile
});
