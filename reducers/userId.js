//import Immutable from 'immutable';

import { LOAD_USER_ID } from '../actions/actionTypes';
import { DataCon, Url } from '../utils';

const INITIAL_STATE = {
  user_id: 0,
}

export default function userID(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_USER_ID: {
      return Object.assign({}, state, {
        user_id: action.userId,
      });
    }
    default: {
      return state;
    }
  }
}
