import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {DataCon, Url, connectModals} from '../../../utils';

import {updateFollowingList, loadProfileDetail} from '../../../actions/dispatchers';
import ProfileEditBox from './ProfileEditBox';

/*
 * props
 * - id
 * - name
 * - description
 * - mine
 */

const ProfileEditBoxContainer = React.createClass({
  submitEdit(data) {
    const url = Url.getUrl(`/profiles/${this.props.id}`);
    DataCon.postDataToServer(url, 'PUT', data)
      .then(() => this.props.updateFollowingList())
      .then(() => this.props.loadProfileDetail(this.props.id));
  },

  handleEdit(data) {
    console.log(data);
    if (data.name === '' || data.description === '') {
      this.props.alertModal('알림', '이름과 설명을 모두 입력해주세요.');
      return;
    }
    this.submitEdit(data);
    browserHistory.push(`/${this.props.id}`);
  },

  render() {
    const {id, mine, name, description} = this.props;
    if (!mine) {
      return <p>관리자가 아닙니다.</p>;
    }

    return (
      <ProfileEditBox id={id} name={name} description={description} onEdit={this.handleEdit}/>
    );
  }
});

const mapDispatchToProps = function (dispatch) {
  return {
    updateFollowingList: () => updateFollowingList(dispatch),
    loadProfileDetail: id => loadProfileDetail(dispatch, id)
  };
};

export default connectModals(connect(null, mapDispatchToProps)(ProfileEditBoxContainer));
