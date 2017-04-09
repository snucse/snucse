import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import queryString from 'query-string';

import {UserLevel} from '../../utils';

const TagCloud = React.createClass({
  render() {
    const tagItems = this.props.tags.map(tag => {
      switch (this.props.userLevel) {
        case UserLevel.REGULAR:
          return (
            <li className="tag-cloud-tag-item" key={tag.tag}>
              <Link to={{pathname: '/tags', search: '?' + queryString.stringify({tag: tag.tag})}}>
                {tag.tag}
              </Link>
            </li>
          );
        default:
          return (
            <li className="tag-cloud-tag-item" key={tag.tag}>{tag.tag}</li>
          );
      }
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

const mapStateToProps = function (state) {
  return {
    userLevel: state.userInfo.userLevel
  };
};

export default connect(mapStateToProps)(TagCloud);
