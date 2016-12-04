import React from 'react';

const FeedLoadMore = React.createClass({
  getInitialState() {
    return {
      loading: false
    };
  },

  componentWillReceiveProps() {
    this.setState({loading: false});
  },

  handleLoadMore() {
    if (!this.state.loading) {
      this.props.onLoadMore(this.props.options);
      this.setState({loading: true});
    }
  },

  render() {
    const message = this.state.loading ? 'Loading...' : 'Load more';
    return (
      <div onClick={this.handleLoadMore}>{message}</div>
    );
  }
});

export default FeedLoadMore;
