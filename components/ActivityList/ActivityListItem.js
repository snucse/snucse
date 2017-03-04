import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';

const messages = {
  /*
    type: {
      action: message-generator(),
    },
  */
  Article: {
    create: (actor, article) => `${actor.name}님이 [${article.title}] 글을 작성했습니다.`,
    update: (actor, article) => `${actor.name}님이 [${article.title}] 글을 수정했습니다.`
  },
  Profile: {
    create: (actor, profile) => `${actor.name}님이 [${profile.name}] 프로필을 생성했습니다.`,
    update: (actor, profile) => `${actor.name}님이 [${profile.name}] 프로필을 수정했습니다.`
  },
  Comment: {
    create: (actor, article) => `${actor.name}님이 [${article.title}] 글에 댓글을 달았습니다.`,
    update: (actor, article) => `${actor.name}님이 [${article.title}] 글의 댓글을 수정했습니다.`
  },
  ProfileComment: {
    create: (actor, profile) => `${actor.name}님이 [${profile.name}] 프로필에 댓글을 달았습니다.`,
    update: (actor, profile) => `${actor.name}님이 [${profile.name}] 프로필에 댓글을 달았습니다.`
  },
  ArticleTag: {
    create: (actor, article, activity) => `${actor.name}님이 [${article.title}] 글에 [${activity.tag}] 태그를 달았습니다.`
  },
  ProfileTag: {
    create: (actor, profile, activity) => `${actor.name}님이 [${profile.name}] 프로필에 [${activity.tag}] 태그를 달았습니다.`
  },
  ImageTag: {
    create: (actor, article, activity) => `${actor.name}님이 [${article.title}] 글의 이미지에 [${activity.tag}] 태그를 달았습니다.`
  }
};

const ActivityListItem = React.createClass({

  propTypes: {
    activity: React.PropTypes.object
  },

  render() {
    const {actor, type, profile, article, action, createdAt} = this.props.activity;
    const target = article || profile;
    moment.locale('ko');
    const date = moment(createdAt);
    return (
      <li className="activity-list-item">
        <div className="activity-list-item-date">
          {date.format('YY.MM.DD H:mm')}
        </div>
        <div className="activity-list-item-link-wrapper">
          <Link className="activity-list-item-link" to={`/${target.id}`}>{messages[type][action](actor, target, this.props.activity)}</Link>
        </div>
      </li>
    );
  }
});

export default ActivityListItem;
