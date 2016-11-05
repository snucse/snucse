import React from 'react';
import Profile from './Profile';

const re = /^\d+$/;
const ClassManager = React.createClass({
  render() {
    const {id} = this.props.params;
    if (re.test(id)) {
      return (
        <Profile id={id}/>
      );
      // 여기서 숫자로 받고 글 하나를 보여줘야함
    }
    return (
      <Profile id={id}/>
    );
  }
});

export default ClassManager;
