import React from 'react';
// 컴포넌트 혼자 쓰여도 됨

import '../../stylesheets/to-top-button.styl';

const ToTopButton = React.createClass({

  getInitialState() {
    return {
      show: false,
      lastScrollY: 0
    };
  },

  dismiss: null,
  scrollListener() {
    const showSecond = 1000;
    const currentScrollY = window.scrollY;
    if (currentScrollY === 0) {
      clearInterval(this.dismiss);
      this.setState({
        show: false
      });
    } else if (this.state.lastScrollY > currentScrollY) {
      // up
      this.setState({
        show: true
      });
      if (this.dismiss !== null) {
        clearInterval(this.dismiss);
      }
      this.dismiss = setInterval(() => {
        this.setState({
          show: false
        });
      }, showSecond);
    } else {
      // down
    }
    this.setState({
      lastScrollY: currentScrollY
    });
  },

  componentDidMount() {
    window.addEventListener('scroll', this.scrollListener);
  },

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListener);
  },

  handleClickTopButton() {
    window.scrollTo(0, 0);
  },

  render() {
    const button = (
      <div id="to-top-button-wrapper">
        <div id="to-top-button" onClick={this.handleClickTopButton}>
          <span id="to-top-button-content">^</span>
        </div>
      </div>
    );
    return this.state.show ? button : null;
  }
});

export default ToTopButton;
