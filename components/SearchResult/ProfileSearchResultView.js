import React from 'react';
import {Link} from 'react-router';

import {ProfileSearchResult} from './SearchResultItems';

const ProfileSearchResultView = React.createClass({
  render() {
    const {query, result} = this.props;
    const profileResults = result.profiles.map(profile => {
      return <ProfileSearchResult profile={profile} key={`${query}-${profile.id}`}/>;
    });
    return (
      <section>
        <h3>{`'${query}'`} 프로필 검색 결과</h3>
        <form>서치 폼</form>
        <section>
          <h4>프로필</h4>
          {profileResults}
          <footer>
            <span><Link to={`/search?category=profile&query=${query}`}>더보기</Link> (총 개수?)</span>
          </footer>
        </section>
        <p>
          {'0, 1, 2, 3, 4, 5, 6, 7, 8, 9 > 임시'}
        </p>
      </section>
    );
  }
});

export default ProfileSearchResultView;
