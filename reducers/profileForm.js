import {CHANGE_NAME, CHANGE_ID, CHANGE_DESC} from '../actions/actionTypes';

const INITIAL_STATE = {
  id: '',
  name: '',
  desc: ''
};

export default function profileForm(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_ID: {
      return Object.assign({}, state, {
        id: action.id
      });
    }
    case CHANGE_NAME: {
      return Object.assign({}, state, {
        name: action.name
      });
    }
    case CHANGE_DESC: {
      return Object.assign({}, state, {
        desc: action.desc
      });
    }
    default: {
      return state;
    }
  }
}
