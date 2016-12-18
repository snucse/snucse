import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {DataCon, Url} from '../../../utils';

import {loadProfileDetail} from '../../../actions/dispatchers';
import ProfileBox from './ProfileBox';

/*
 * props
 * - id
 * - name
 * - desc
 * - onSubmit
 */

const ProfileBoxContainer = React.createClass({
  componentDidMount() {
    this.props.loadProfileDetail(this.props.id);
  },

  componentWillReceiveProps(props) {
    if (this.props.id !== props.id) {
      this.props.loadProfileDetail(props.id);
    }
  },

  submitEdit(data) {
    const url = Url.getUrl(`/profiles/${this.props.id}`);
    DataCon.postDataToServer(url, 'PUT', data);
  },

  handleEdit(data) {
    this.submitEdit(data);
    browserHistory.push(`/${this.props.id}`);
  },

  render() {
    const {id, userId, admin, name, description} = this.props;
    const mine = (admin && userId === admin.id);
    if (!mine) {
      return <p>관리자가 아닙니다.</p>;
    }

    return (
      <div className="profile-box">
        <ProfileBox id={id} name={name} desc={description} onEdit={this.handleEdit}/>
      </div>
    );
  }
});

const mapStateToProps = function (state) {
  const {name, description, admin} = state.profile.current;
  const {userId} = state.userInfo;
  return {
    name,
    description,
    admin,
    userId
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    loadProfileDetail: id => loadProfileDetail(dispatch, id)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileBoxContainer);
