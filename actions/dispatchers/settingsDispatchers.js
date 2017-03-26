import {DataCon, Url} from '../../utils';
import {loadUserInfo, alertModal} from './';

export function updateProfileImage(dispatch, image) {
  const url = Url.getUrl('/users/profile_image');
  return DataCon.postFormDataToServer(url, 'POST', {image}).then(() => {
    loadUserInfo(dispatch);
    // 일단 업로드가 끝나면 바로 resolve한다. 업데이트를 기다리지 않는다
  });
}

export function changePassword(dispatch, currentPassword, newPassword) {
  const data = {currentPassword, newPassword};
  DataCon.postFormDataToServer(Url.getUrl('/users/password'), 'PUT', data).then(() => {
    alertModal(dispatch, '알림', '비밀번호가 변경되었습니다.');
  }).catch(err => {
    console.error(err);
    if (err.status == 400) {
      alertModal(dispatch, '알림', '현재 비밀번호가 틀렸습니다.');
    }
  });
}
