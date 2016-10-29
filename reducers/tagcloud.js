import {LOAD_TAGCLOUD} from '../actions/actionTypes';

const INITIAL_STATE = {
  tags: []
};

export default function tagcloud(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_TAGCLOUD: {
      return Object.assign({}, state, {
        tags: action.tags
      });
    }
    default: return state;
  }
}
