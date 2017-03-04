import React from 'react';
import {browserHistory} from 'react-router';
import classnames from 'classnames';

import {DataCon, Url, genRefCallback} from '../../utils';

const filters = [
  {
    type: undefined,
    actions: [undefined, 'create', 'update']
  },
  {
    type: 'Article',
    actions: [undefined, 'create', 'update']
  },
  {
    type: 'Profile',
    actions: [undefined, 'create', 'update']
  },
  {
    type: 'Comment',
    actions: [undefined, 'create', 'update']
  },
  {
    type: 'ProfileComment',
    actions: [undefined, 'create', 'update']
  },
  {
    type: 'ArticleTag',
    actions: [undefined, 'create']
  },
  {
    type: 'ProfileTag',
    actions: [undefined, 'create']
  },
  {
    type: 'ImageTag',
    actions: [undefined, 'create']
  }
];

function getFilterByType(type) {
  return filters.filter(filter => filter.type === type)[0];
}

const mapping = {
  undefined: '전체',

  // types
  Article: '글',
  Profile: '프로필',
  Comment: '댓글',
  ProfileComment: '프로필댓글',
  ArticleTag: '글 태그',
  ProfileTag: '프로필 태그',
  ImageTag: '이미지 태그',

  // actions
  create: '추가',
  update: '수정'
};

const MainCategoryItem = React.createClass({

  propTypes: {
    onClickMainCategory: React.PropTypes.func.isRequired,
    isSelected: React.PropTypes.bool,
    filter: React.PropTypes.object
  },

  handleClickItem() {
    this.props.onClickMainCategory(this.props.filter);
  },

  render() {
    const classname = classnames({
      'activity-filter-main-category-item': true,
      'activity-filter-main-category-item-selected': this.props.isSelected
    });
    return (
      <span
        onClick={this.handleClickItem}
        className={classname}
        >
        {mapping[this.props.filter.type]}
      </span>
    );
  }
});

const SubCategoryItem = React.createClass({

  propTypes: {
    onClickSubCategory: React.PropTypes.func.isRequired,
    isSelected: React.PropTypes.bool,
    action: React.PropTypes.string
  },

  handleClickItem() {
    this.props.onClickSubCategory(this.props.action);
  },

  render() {
    const classname = classnames({
      'activity-filter-sub-category-item': true,
      'activity-filter-sub-category-item-selected': this.props.isSelected
    });
    return (
      <span
        onClick={this.handleClickItem}
        className={classname}
        >
        {mapping[this.props.action]}
      </span>
    );
  }
});

const CandidateProfileItem = React.createClass({

  propTypes: {
    onClickCandidateProfile: React.PropTypes.func,
    profile: React.PropTypes.object
  },

  handleClickCandidateProfile() {
    this.props.onClickCandidateProfile(this.props.profile.id, this.props.profile.name);
  },

  render() {
    return (
      <div className="activity-filter-profile-candidate-item" onClick={this.handleClickCandidateProfile}>
        {this.props.profile.name} ({this.props.profile.id})
      </div>
    );
  }
});

const ActivityFilter = React.createClass({

  propTypes: {
    candidateProfiles: React.PropTypes.array,
    searchProfile: React.PropTypes.func,
    query: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      opened: false,
      selectedType: filters[0],
      selectedAction: filters[0].actions[0],

      isSearching: false,
      candidateProfileIndex: -1,
      timer: null
    };
  },

  componentDidMount() {
    const initialType = getFilterByType(this.props.query.type) || filters[0];
    this.setState({
      previousType: initialType,
      selectedType: initialType,
      selectedAction: this.props.query.action || initialType.actions[0],
      profileId: this.props.query.profileId,
      isProfileSelected: this.props.query.profileId !== undefined
    }, () => {
      if (this.state.isProfileSelected) {
        DataCon.loadDataFromServer(Url.getUrl(`/profiles/${this.props.query.profileId}`)).then(profile => {
          this.setState({
            selectedProfileName: profile.name
          });
          this._query.value = profile.name;
        }).catch(console.error);
      }
    });
  },

  componentWillReceiveProps(props) {
    const initialType = getFilterByType(props.query.filterType) || filters[0];
    this.setState({
      opened: false,
      previousType: initialType,
      selectedType: initialType,
      selectedAction: props.query.filterAction || initialType.actions[0]
    });
  },

  searchProfile() {
    const query = this._query.value;
    this.props.searchProfile(query);
  },

  handleFocusInput(event) {
    event.target.value = '';
  },

  handleBlurInput(event) {
    if (this.state.isProfileSelected) {
      event.target.value = this.state.selectedProfileName;
    }
    this.setState({
      isSearching: false
    });
  },

  handleChangeInput(event) {
    if (event.target.value === '') {
      this.setState({
        isSearching: false,
        candidateProfileIndex: -1
      });
      return;
    }
    if (this.state.timer) {
      clearInterval(this.state.timer);
      this.setState({timer: null});
    }
    this.setState({timer: setInterval(this.timerCallback, 300)});
  },

  timerCallback() {
    clearInterval(this.state.timer);
    if (this._query === document.activeElement) {
      this.props.searchProfile(this._query.value);
      this.setState({
        timer: null,
        isSearching: true,
        candidateProfileIndex: -1
      });
    }
  },

  handleClickCancleButton() {
    this.setState({
      profileId: undefined,
      isProfileSelected: false,
      selectedProfileName: undefined
    }, () => {
      this._query.value = '';
      this.pushHistory();
    });
  },

  handleClickToggleButton() {
    this.setState({
      opened: !this.state.opened,
      selectedType: this.state.previousType
    });
  },

  handleClickMainCategory(type) {
    this.setState({
      selectedType: type
    });
  },

  handleClickSubCategory(action) {
    this.setState({
      previousType: this.state.selectedType,
      selectedAction: action,
      opened: false
    }, () => {
      // push history
      this.pushHistory();
    });
  },

  handleClickCandidateProfile(profileId, selectedProfileName) {
    this.setState({
      profileId,
      selectedProfileName,
      isSearching: false,
      candidateProfileIndex: -1,
      isProfileSelected: true
    }, () => {
      this._query.value = selectedProfileName;
      this.pushHistory();
    });
  },

  pushHistory() {
    const params = {};
    params.filterType = this.state.selectedType.type;
    params.filterAction = this.state.selectedAction;
    params.profileId = this.state.profileId;
    const paramsString = Object.keys(params).filter(key => {
      return params[key] !== undefined && params[key] !== null;
    }).map(key => {
      return `${key}=${params[key]}`;
    }).join('&');
    browserHistory.push(`/activities?${paramsString}`);
  },

  render() {
    const mainCategoriesView = filters.map(filter => {
      const isSelected = filter.type === this.state.selectedType.type;
      return (
        <MainCategoryItem
          onClickMainCategory={this.handleClickMainCategory}
          isSelected={isSelected}
          filter={filter}
          key={`main-category-${filter.type}`}
          />
      );
    });
    const subCategoriesView = this.state.selectedType.actions.map(action => {
      const isSelected = action === this.state.selectedAction;
      return (
        <SubCategoryItem
          onClickSubCategory={this.handleClickSubCategory}
          isSelected={isSelected}
          action={action}
          key={`sub-category-${action}`}
          />
      );
    });
    const nav = this.state.opened ? (
      <nav id="activity-filter-category-wrapper">
        <ul id="activity-filter-main-category-wrapper">
          {mainCategoriesView}
        </ul>
        <ul id="activity-filter-sub-category-wrapper">
          {subCategoriesView}
        </ul>
      </nav>
    ) : null;

    const profileAutocompleteItemViews = this.props.candidateProfiles.length === 0 ? (
      <span>검색 결과가 없습니다</span>
    ) : this.props.candidateProfiles.map(profile => {
      return (
        <CandidateProfileItem
          onClickCandidateProfile={this.handleClickCandidateProfile}
          profile={profile}
          key={`profile-candidate-${profile.id}`}
          />
      );
    });
    const profileAutocompleteView = this.state.isSearching ? (
      <ul id="activity-filter-profile-candidate-wrapper">
        {profileAutocompleteItemViews}
      </ul>
    ) : null;
    const cancelButton = this.state.isProfileSelected ? (
      <span id="activity-filter-profile-cancel-button" onClick={this.handleClickCancleButton}>X</span>
    ) : null;

    return (
      <header id="activity-header">
        <div id="activity-filter">
          <span id="activity-filter-type" onClick={this.handleClickToggleButton}>분류</span>
          <input
            id="activity-filter-profile-input"
            placeholder="프로필로 검색할 수 있습니다"
            onFocus={this.handleFocusInput}
            onBlur={this.handleBlurInput}
            onChange={this.handleChangeInput}
            ref={genRefCallback(this, '_query')}
            />
          {cancelButton}
          {profileAutocompleteView}
        </div>
        {nav}
      </header>
    );
  }
});

export default ActivityFilter;
