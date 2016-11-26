import {UPDATE_FOLLOWING} from '../actions/actionTypes';
import {updateObject, createReducer} from './common';

const ME_INITIAL_STATE = {
  following: []
};

function updateFollowing(state, action) {
  return updateObject(state, {
    following: action.profiles
  });
}

export default createReducer(ME_INITIAL_STATE, {
  [UPDATE_FOLLOWING]: updateFollowing
});
