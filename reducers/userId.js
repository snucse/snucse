import {LOAD_USER_ID} from '../actions/actionTypes';

const INITIAL_STATE = {
  userId: 0
};

export default function userID(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_USER_ID: {
      return Object.assign({}, state, {
        userId: action.userId
      });
    }
    default: {
      return state;
    }
  }
}
