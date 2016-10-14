import {LOAD_PROFILE_DETAIL, UPDATE_FOLLOWING_STATE} from '../actions/actionTypes';

const INITIAL_STATE = {
  data: {
    following: false,
    name: '',
    description: ''
  }
};

export default function profile(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_PROFILE_DETAIL: {
      return Object.assign({}, state, {
        data: action.data
      });
    }
    case UPDATE_FOLLOWING_STATE: {
      const data = Object.assign({}, state.data, {
        following: action.following
      });
      return Object.assign({}, state, {
        data
      });
    }
    default: return state;
  }
}
