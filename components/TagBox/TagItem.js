import React from 'react';

const TagItem = React.createClass({
  handleClickDelete() {
    this.props.onDelete(this.props.tag.tag);
  },

  render() {
    return (
      <li className="tag-item">
        {this.props.tag.tag}
        <button onClick={this.handleClickDelete} className="delete-button">×</button>
      </li>
    );
  }
});

export default TagItem;
