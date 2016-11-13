import {LOAD_USER_ID} from '../actions/actionTypes';
import {updateObject} from './common';

const INITIAL_STATE = {
  userId: 0
};

export default function userId(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_USER_ID: {
      return updateObject(state, {
        userId: action.userId
      });
    }
    default: {
      return state;
    }
  }
}
