import React from 'react';

import TagItemContainer from './TagItemContainer';

const TagList = React.createClass({

  propTypes: {
    id: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    userLevel: React.PropTypes.number,
    deletable: React.PropTypes.bool,
    deleteTag: React.PropTypes.func,
    tags: React.PropTypes.object
  },

  render() {
    const {id, userLevel, deletable, deleteTag} = this.props;
    const tags = this.props.tags[id] || []; // give it to parent
    const tagItems = tags.map(tag => {
      return (
        <TagItemContainer
          id={id}
          tag={tag}
          userLevel={userLevel}
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
