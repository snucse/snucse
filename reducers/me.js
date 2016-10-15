import {UPDATE_FOLLOWING} from '../actions/actionTypes';

const INITIAL_STATE = {
  following: []
};

export default function me(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_FOLLOWING: {
      return Object.assign({}, state, {
        following: action.profiles
      });
    }
    default: return state;
  }
}
