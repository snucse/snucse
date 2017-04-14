import React from 'react';
import {Link} from 'react-router-dom';
import queryString from 'query-string';

const TagItem = React.createClass({

  propTypes: {
    accessible: React.PropTypes.bool,
    deletable: React.PropTypes.bool
  },

  handleClickDelete() {
    this.props.onDelete(this.props.tag.tag);
  },

  render() {
    const tagName = this.props.accessible ? (
      <Link
        className="tag-item-name"
        to={{pathname: '/tags', search: '?' + queryString.stringify({tag: this.props.tag.tag})}}
        >
        <span title={`tagged by ${this.props.tag.writer.name}`}>{this.props.tag.tag}</span>
      </Link>
    ) : (
      <span className="tag-item-name">{this.props.tag.tag}</span>
    );
    const deleteButton = this.props.accessible && this.props.deletable ? (
      <button className="tag-item-delete-button" onClick={this.handleClickDelete}>×</button>
    ) : null;
    return (
      <li className="tag-item">
        {tagName}
        {deleteButton}
      </li>
    );
  }
});

export default TagItem;
