import {LOAD_PROFILE_DETAIL, UPDATE_FOLLOWING_STATE, LOAD_ALL_PROFILES} from '../actions/actionTypes';

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
      return Object.assign({}, state, {
        current: action.current
      });
    }
    case UPDATE_FOLLOWING_STATE: {
      const current = Object.assign({}, state.current, {
        following: action.following
      });
      return Object.assign({}, state, {
        current
      });
    }
    case LOAD_ALL_PROFILES: {
      return Object.assign({}, state, {
        allProfiles: action.allProfiles
      });
    }
    default: return state;
  }
}
