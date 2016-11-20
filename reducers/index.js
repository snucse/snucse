import userId from './userId';
import articleList from './articleList';
import feeds from './feeds';
import profile from './profile';
import profileForm from './profileForm';
import comment from './comment';
import tag from './tag';
import me from './me';
import search from './search';
// import * as types from '../actions/actionTypes';
// import other reducers

// define other reducers

const reducers = {
  profile,
  profileForm,
  articleList,
  feeds,
  comment,
  tag,
  userId,
  me,
  search
  // list up all reducers
};

// this file exports a mere object, which is to be combined at app.js later
export default reducers;
