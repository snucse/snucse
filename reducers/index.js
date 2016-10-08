import postList from './postList';
import profileList from './profileList';
import profileForm from './profileForm';
import comment from './comment';
// import other reducers

// define other reducers

const reducers = {
  profileList,
  profileForm,
  postList,
  comment
};

// this file exports a mere object, which is to be combined at app.js later
export default reducers;
