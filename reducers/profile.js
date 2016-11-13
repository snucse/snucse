import {LOAD_PROFILE_DETAIL, UPDATE_FOLLOWING_STATE, LOAD_ALL_PROFILES} from '../actions/actionTypes';
import {updateObject} from './common';

const INITIAL_STATE = {
  current: {
    following: false,
    name: '',
    description: ''
  },
  allProfiles: []
};

export default function profile(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_PROFILE_DETAIL: {
      return updateObject(state, {
        current: action.current
      });
    }
    case UPDATE_FOLLOWING_STATE: {
      const current = updateObject(state.current, {
        following: action.following
      });
      return updateObject(state, {
        current
      });
    }
    case LOAD_ALL_PROFILES: {
      return updateObject(state, {
        allProfiles: action.allProfiles
      });
    }
    default: return state;
  }
}
