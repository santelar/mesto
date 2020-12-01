export class UserInfo {
  constructor({ profileName, profileDescription }) {
    this._userName = profileName;
    this._userDescription = profileDescription;
  }

  getUserInfo() {
    const profileInfo = {};
    this._profileInfo.name = this._userName.textContent,
    this._profileInfo.description = this._userDescription.textContent
    return profileInfo;
  }

  setUserInfo({ name, description }) {
    this._userName.textContent = this._profileInfo.name;
    this._userDescription.textContent = this._profileInfo.description;
  }

}
