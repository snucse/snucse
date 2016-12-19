import {connect} from 'react-redux';

import {cancelModal, normalModal, alertModal, confirmModal, makeCustomModal} from '../actions/dispatchers';

const mapDispatchToProps = function (dispatch) {
  return {
    cancelModal: () => cancelModal(dispatch),
    normalModal: (title, message, callback) => normalModal(dispatch, title, message, callback),
    alertModal: (title, message, callback) => alertModal(dispatch, title, message, callback),
    confirmModal: (title, message, positiveCallback, negativeCallback) =>
      confirmModal(dispatch, title, message, positiveCallback, negativeCallback),
    makeCustomModal: (modalType, title, message, buttons, callbacks, options) =>
      makeCustomModal(dispatch, modalType, title, message, buttons, callbacks, options)
  };
};

export default function (component) {
  return connect(null, mapDispatchToProps)(component);
}
