import React from 'react';

const RecommendBox = React.createClass({
  handleRecommend() {
    this.props.onRecommend();
  },

  render() {
    return (
      <div className="recommend-box">
        <button className="recommend" onClick={this.handleRecommend()}>추천</button>
        <span className="recommend-count">{`(${this.props.count})`}</span>
      </div>
    );
  }
});

export default RecommendBox;
