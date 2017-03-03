import React from 'react';

import {ProfileSearchResult} from './SearchResultItems';
import SearchResultLinks from './SearchResultLinks';

const ProfileSearchResultView = React.createClass({
  render() {
    const {query, result} = this.props;
    const page = Number(this.props.page) || 0;
    const num = Number(this.props.num) || 10;
    const profileResults = result.profiles.data.map(profile => {
      return <ProfileSearchResult profile={profile} key={`${query}-${profile.id}`}/>;
    });
    return (
      <section>
        <h4>프로필</h4>
        <ul id="tag-info-profile-list">
          {profileResults}
        </ul>
        <footer>
          <SearchResultLinks category={'profile'} query={query} page={page} num={num} count={result.profiles.count}/>
        </footer>
      </section>
    );
  }
});

export default ProfileSearchResultView;
