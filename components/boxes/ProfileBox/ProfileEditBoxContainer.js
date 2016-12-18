import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {DataCon, Url} from '../../../utils';

import {updateFollowingList} from '../../../actions/dispatchers';
import ProfileEditBox from './ProfileEditBox';

/*
 * props
 * - id
 * - name
 * - desc
 * - mine
 */

const ProfileEditBoxContainer = React.createClass({
  submitEdit(data) {
    const url = Url.getUrl(`/profiles/${this.props.id}`);
    DataCon.postDataToServer(url, 'PUT', data)
      .then(this.props.updateFollowingList());
  },

  handleEdit(data) {
    this.submitEdit(data);
    browserHistory.push(`/${this.props.id}`);
  },

  render() {
    const {id, mine, name, desc} = this.props;
    if (!mine) {
      return <p>관리자가 아닙니다.</p>;
    }

    return (
      <ProfileEditBox id={id} name={name} desc={desc} onEdit={this.handleEdit}/>
    );
  }
});

const mapDispatchToProps = function (dispatch) {
  return {
    updateFollowingList: () => updateFollowingList(dispatch)
  };
};

export default connect(null, mapDispatchToProps)(ProfileEditBoxContainer);
