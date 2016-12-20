import React from 'react';

const FeedLoadMore = React.createClass({
  getInitialState() {
    return {
      loading: false
    };
  },

  componentDidMount() {
    window.addEventListener('load', this.handleVisibilityChange);
    window.addEventListener('scroll', this.handleVisibilityChange);
    window.addEventListener('resize', this.handleVisibilityChange);
  },

  componentWillUnmount() {
    window.removeEventListener('load', this.handleVisibilityChange);
    window.removeEventListener('scroll', this.handleVisibilityChange);
    window.removeEventListener('resize', this.handleVisibilityChange);
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

  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433
  handleVisibilityChange() {
    if (!this.props.options.automatic || this.state.loading) {
      return;
    }
    if (this.isElementInViewport()) {
      this.handleLoadMore();
    }
  },

  isElementInViewport() {
    if (!this.el) {
      return false;
    }
    const rect = this.el.getBoundingClientRect();
    return (
      rect.bottom >= 0 &&
      rect.right >= 0 &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  handleRef(ref) {
    this.el = ref;
    this.handleVisibilityChange();
  },

  render() {
    const message = this.state.loading ? 'Loading...' : 'Load more';
    return (
      <li className="feed-load-more" onClick={this.handleLoadMore} ref={this.handleRef}>{message}</li>
    );
  }
});

export default FeedLoadMore;
