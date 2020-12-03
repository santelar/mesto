export class UserInfo {
  constructor({ profileName, profileDescription }) {
    this._userName = profileName;
    this._userDescription = profileDescription;
  }

  getUserInfo() {
    this._profileInfo = {};
    this._profileInfo.name = this._userName.textContent,
    this._profileInfo.description = this._userDescription.textContent
    return this._profileInfo;
  }

  setUserInfo(formData) {
    this._userName.textContent = formData.name;
    this._userDescription.textContent = formData.description;
  }
}
