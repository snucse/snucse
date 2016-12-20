import React from 'react';

const RecommendBox = React.createClass({
  handleRecommend() {
    this.props.onRecommend();
  },

  render() {
    return (
      <div className="recommend-container">
        <button className="recommend-button" onClick={this.handleRecommend}>추천<span className="recommend-count">{this.props.count}</span></button>
      </div>
    );
  }
});

export default RecommendBox;
