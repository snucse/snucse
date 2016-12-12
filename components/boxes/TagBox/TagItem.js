import React from 'react';
import {Link} from 'react-router';

const TagItem = React.createClass({
  handleClickDelete() {
    this.props.onDelete(this.props.tag.tag);
  },

  render() {
    return this.props.accessible ? (
      <li className="tag-item">
        <Link to={`/tags/${this.props.tag.tag}`}>{this.props.tag.tag}</Link>
        <button onClick={this.handleClickDelete} className="delete-button">×</button>
      </li>
    ) : (
      <li className="tag-item">
        {this.props.tag.tag}
      </li>
    );
  }
});

export default TagItem;
