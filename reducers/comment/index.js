import {combineReducers} from 'redux';

import articleCommentReducer from './articleComment';
import articleCommentReplyReducer from './articleCommentReply';
import profileCommentReducer from './profileComment';
import profileCommentReplyReducer from './profileCommentReply';

export default combineReducers({
  article: articleCommentReducer,
  articleReply: articleCommentReplyReducer,
  profile: profileCommentReducer,
  profileReply: profileCommentReplyReducer
});
