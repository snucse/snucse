import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {DataCon, Url} from '../../../utils';

import {loadProfileDetail} from '../../../actions/dispatchers';

const ProfileBox = React.createClass({
  getInitialState() {
    return {name: '', desc: ''};
  },

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

  handleNameChange(e) {
    this.setState({name: e.target.value});
  },

  handleDescChange(e) {
    this.setState({desc: e.target.value});
  },

  handleEdit(e) {
    e.preventDefault();
    const name = this.state.name.trim();
    const desc = this.state.desc.trim();

    this.submitEdit({name, desc});
    this.setState({name: '', desc: ''});
    browserHistory.push(`/${this.props.id}`);
  },

  render() {
    const {userId, admin} = this.props;
    const mine = (admin && userId === admin.id);
    if (!mine) {
      return <p>관리자가 아닙니다.</p>;
    }

    return (
      <div className="profile-box">
        <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleNameChange}/>
        <textarea rows="5" id="desc" name="desc" value={this.state.description} onChange={this.handleDescChange}/>
        <input type="button" value="수정" onClick={this.handleEdit}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileBox);
