import React from 'react';
import {Link} from 'react-router';

const TagCloud = React.createClass({
  render() {
    const tagItems = this.props.tags.map(tag => {
      return (
        <li className="tag-item" key={tag.tag}>
          <Link to={`/tags/${tag.tag}`}>{tag.tag}</Link>
        </li>
      );
    });
    return (
      <section id="tagcloud">
        <h3>태그클라우드</h3>
        <ul>
          {tagItems}
        </ul>
      </section>
    );
  }
});

export default TagCloud;
