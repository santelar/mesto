export class UserInfo {
  constructor({ userName, userInfo, userPic}) {
    this._userName = userName;
    this._userInfo = userInfo;
    this._userPic = userPic;
  }

  getUserInfo() {
    this._userData = {};

    this._userData.name = this._userName.textContent;
    this._userData.info = this._userInfo.textContent;

    return this._userData;
  }

  setUserInfo(newUserData) {
    this._userName.textContent = newUserData.name;
    this._userInfo.textContent = newUserData.about;
  }

  setUserPic(newUserData) {
    this._userPic.src = newUserData.avatar;
  }
}