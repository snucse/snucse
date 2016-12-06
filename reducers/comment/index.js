import {combineReducers} from 'redux';

import articleCommentReducer from './articleComment';
import profileCommentReducer from './profileComment';

export default combineReducers({
  article: articleCommentReducer,
  profile: profileCommentReducer
});
