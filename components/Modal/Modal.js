import React from 'react';
import {connect} from 'react-redux';

import {cancelModal} from '../../actions/dispatchers';

// import style

const Modal = React.createClass({
  handleClickWrapper() {
    if (this.props.closable) {
      this.props.cancelModal();
    }
  },

  handleClickModal(event) {
    event.stopPropagation();
  },

  handleClickButton(index) {
    if (typeof this.props.modalInfo.callbacks[index] === 'function') {
      return this.props.modalInfo.callbacks[index];
    }
    return null;
  },

  render() {
    const buttons = this.props.modalInfo.buttons.map((button, i) => {
      return <button onClick={this.handleClickButton(i)} key={`modal-button-${button}-${i}`}>{button}</button>;
    });
    return this.props.enabled ? (
      <div className="modal-wrapper" onClick={this.handleClickWrapper}>
        <div className="modal" onClick={this.handleClickModal}>
          <h3>{this.props.modalInfo.title}</h3>
          <p>{this.props.modalInfo.message}</p>
          <ul className="button-wrapper">
            {buttons}
          </ul>
        </div>
      </div>
    ) : null;
  }
});

const mapStateToProps = function (state) {
  return {
    modalInfo: state.modal.modalInfo,
    enabled: state.modal.enabled,
    closable: state.modal.closable
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    cancelModal: () => cancelModal(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
