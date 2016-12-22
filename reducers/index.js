import userInfo from './userInfo';
import feeds from './feeds';
import article from './article';
import profile from './profile';
import profileAdmin from './profileAdmin';
import comment from './comment';
import tag from './tag';
import me from './me';
import modal from './modal';
import search from './search';
import realtime from './realtime';
// import * as types from '../actions/actionTypes';
// import other reducers

// define other reducers

const reducers = {
  article,
  profile,
  profileAdmin,
  feeds,
  comment,
  tag,
  userInfo,
  me,
  modal,
  search,
  realtime
  // list up all reducers
};

// this file exports a mere object, which is to be combined at app.js later
export default reducers;
