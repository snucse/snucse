import React from 'react';
import ProfilePost from './ProfilePost.js';

const re = /^\d+$/;
const ClassManager = React.createClass({
  render() {
    const {id} = this.props.params;

    if (re.test(id)) {
      return (
        <ProfilePost url={this.props.route.url} id={id}/>
      );
      // 여기서 숫자로 받고 글 하나를 보여줘야함
    }
    return (
      <ProfilePost url={this.props.route.url} id={id}/>
    );
  }
});

export default ClassManager;
