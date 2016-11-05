import {LOAD_PROFILE_LIST} from '../actions/actionTypes';

const INITIAL_STATE = {
  profileList: []
};

export default function loadProfileList(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_PROFILE_LIST: {
      return Object.assign({}, state, {
        profileList: action.profileList
      });
    }
    default: {
      return state;
    }
  }
}
