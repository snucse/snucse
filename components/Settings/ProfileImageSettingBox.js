import React from 'react';
import {connect} from 'react-redux';

import {DataCon, Url} from '../../utils';
import {alertModal} from '../../actions/dispatchers';

const ProfileImageSettingBox = React.createClass({
  getInitialState() {
    return {
      file: undefined
    };
  },

  handleFileChange(e) {
    this.setState({file: e.target.files[0]});
  },

  handleSubmit() {
    const {file} = this.state;

    if (!file) {
      this.props.alertModal('알림', '파일을 선택해주세요.');
      return;
    }

    const url = Url.getUrl('/users/profile_image');
    DataCon.postFormDataToServer(url, 'POST', {image: file})
      .then(() => {
        this.props.alertModal('알림', '변경되었습니다.');
        // TODO: reload profile images
      });
  },

  render() {
    return (
      <div className="profile-image-setting-box">
        <input type="file" accept="image/*" onChange={this.handleFileChange}/>
        <button type="button" onClick={this.handleSubmit}>변경하기</button>
      </div>
    );
  }
});

const mapDispatchToProps = function (dispatch) {
  return {
    alertModal: (title, message, callback) => alertModal(dispatch, title, message, callback)
  };
};

export default connect(null, mapDispatchToProps)(ProfileImageSettingBox);
