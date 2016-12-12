import React from 'react';
import Profile from './Profile';
import Article from './Article';

const re = /^\d+$/;
const ClassManager = React.createClass({
  render() {
    const {id} = this.props.params;
    if (re.test(id)) {
      return <Article id={id}/>;
    }
    return <Profile id={id}/>;
  }
});

export default ClassManager;
