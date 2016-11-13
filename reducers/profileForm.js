import {CHANGE_NAME, CHANGE_ID, CHANGE_DESC} from '../actions/actionTypes';
import {updateObject} from './common';

const INITIAL_STATE = {
  id: '',
  name: '',
  desc: ''
};

export default function profileForm(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_ID: {
      return updateObject(state, {
        id: action.id
      });
    }
    case CHANGE_NAME: {
      return updateObject(state, {
        name: action.name
      });
    }
    case CHANGE_DESC: {
      return updateObject(state, {
        desc: action.desc
      });
    }
    default: {
      return state;
    }
  }
}
