import {UPDATE_FOLLOWING} from '../actions/actionTypes';
import {updateObject} from './common';

const INITIAL_STATE = {
  following: []
};

export default function me(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_FOLLOWING: {
      return updateObject(state, {
        following: action.profiles
      });
    }
    default: return state;
  }
}
