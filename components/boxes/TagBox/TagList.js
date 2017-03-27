import React from 'react';

import TagItemContainer from './TagItemContainer';

const TagList = React.createClass({

  propTypes: {
    id: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    accessible: React.PropTypes.bool,
    deletable: React.PropTypes.bool,
    deleteTag: React.PropTypes.func,
    tags: React.PropTypes.array
  },

  render() {
    const {id, accessible, deletable, deleteTag} = this.props;
    const tags = this.props.tags || [];
    const tagItems = tags.map(tag => {
      return (
        <TagItemContainer
          id={id}
          tag={tag}
          accessible={accessible}
          deletable={deletable}
          deleteTag={deleteTag}
          key={tag.tag}
          />
      );
    });
    return (
      <ul className="tag-list">
        {tagItems}
      </ul>
    );
  }
});

export default TagList;
