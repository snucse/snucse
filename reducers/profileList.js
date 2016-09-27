import { LOAD_PROFILES } from '../actions/actionTypes'

const INITIAL_STATE = {
  data: {
    profiles: []
  },
}

export default function profileList(state = INITIAL_STATE, action){
  switch (action.type) {
    case LOAD_PROFILES: {
      return Object.assign({}, state, {
        data: action.data,
      });
    }
    default: {
      return state;
    }
  }
}
