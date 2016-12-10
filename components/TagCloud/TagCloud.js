import React from 'react';
import {Link} from 'react-router';

const TagCloud = React.createClass({
  render() {
    const tagItems = this.props.tags.map(tag => {
      return (
        <li className="tag-cloud-tag-item" key={tag.tag}>
          <Link to={`/tags/${tag.tag}`}>{tag.tag}</Link>
        </li>
      );
    });
    return (
      <section id="tag-cloud-box">
        <h5 id="tag-cloud-title">태그클라우드</h5>
        <ul>
          {tagItems}
        </ul>
      </section>
    );
  }
});

export default TagCloud;
