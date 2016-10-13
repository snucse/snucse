import {CHANGE_NAME, CHANGE_SID, CHANGE_DESC} from '../actions/actionTypes';

const INITIAL_STATE = {
  sid: '',
  name: '',
  desc: ''
};

export default function profileForm(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_SID: {
      return Object.assign({}, state, {
        sid: action.sid
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
