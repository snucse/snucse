import React from 'react';
// 컴포넌트 혼자 쓰여도 됨

const ToTopButton = React.createClass({

  getInitialState() {
    return {
      show: false
    };
  },

  lastScrollY: 0,
  dismiss: null,
  scrollListener() {
    const currentScrollY = window.scrollY;
    if (currentScrollY === 0) {
      clearInterval(this.dismiss);
      this.setState({
        show: false
      });
    } else if (this.lastScrollY > currentScrollY) {
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
      }, 2000);
    } else {
      // down
    }
    this.lastScrollY = currentScrollY;
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
      <div style={{position: 'fixed', left: '0px', bottom: '20px', textAlign: 'center', width: '100%', zIndex: 100}}>
        <span onClick={this.handleClickTopButton} style={{cursor: 'pointer', fontSize: '25px'}}>^</span>
      </div>
    );
    return this.state.show ? button : null;
  }
});

export default ToTopButton;
