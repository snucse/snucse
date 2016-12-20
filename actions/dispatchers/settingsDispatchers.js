import {DataCon, Url} from '../../utils';
import {loadUserInfo} from './';

export function updateProfileImage(dispatch, image) {
  const url = Url.getUrl('/users/profile_image');
  return DataCon.postFormDataToServer(url, 'POST', {image}).then(() => {
    loadUserInfo(dispatch);
    // 일단 업로드가 끝나면 바로 resolve한다. 업데이트를 기다리지 않는다
  });
}
