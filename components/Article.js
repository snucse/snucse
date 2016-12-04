import React from 'react';
import {connect} from 'react-redux';

import {loadArticle} from '../actions/dispatchers';

const Article = React.createClass({

  // load article
  componentDidMount() {
    this.props.loadArticle(this.props.id);
  },

  componentWillReceiveProps(props) {
    if (props.id !== this.props.id) {
      this.props.loadArticle(props.id);
    }
  },

  render() {
    return <span>{this.props.id}</span>;
  }
});

// connect state to props
const mapDispatchToProps = function (dispatch) {
  return {
    loadArticle: id => loadArticle(dispatch, id)
  };
};

export default connect(null, mapDispatchToProps)(Article);
