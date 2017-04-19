import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {DataCon, Url, connectModals} from '../../../utils';

import {updateFollowingList, loadProfileDetail} from '../../../actions/dispatchers';
import ProfileEditBox from './ProfileEditBox';

/*
 * props
 * - id
 * - name
 * - description
 * - renderingMode
 * - mine
 */

const ProfileEditBoxContainer = React.createClass({
  handleEdit(data) {
    if (data.name === '' || data.description === '') {
      this.props.alertModal('알림', '이름과 설명을 모두 입력해주세요.');
      return;
    }
    this.props.submitEdit(data, this.props.id);
  },

  render() {
    const {id, mine, name, description, renderingMode} = this.props;
    if (!mine) {
      return <p>관리자가 아닙니다.</p>;
    }

    return (
      <ProfileEditBox id={id} name={name} description={description} onEdit={this.handleEdit} renderingMode={renderingMode}/>
    );
  }
});

const mapDispatchToProps = function (dispatch) {
  return {
    updateFollowingList: () => updateFollowingList(dispatch),
    loadProfileDetail: id => loadProfileDetail(dispatch, id),
    submitEdit: (data, id) => {
      const url = Url.getUrl(`/profiles/${id}`);
      DataCon.postDataToServer(url, 'PUT', data)
        .then(() => updateFollowingList(dispatch))
        .then(() => loadProfileDetail(dispatch, id))
        .then(() => dispatch(push(`/${id}`)))
        .catch(console.error);
    }
  };
};

export default connectModals(connect(null, mapDispatchToProps)(ProfileEditBoxContainer));
