export class UserInfo {
  constructor({ profileName, profileDescription }) {
    this._userName = profileName;
    this._userDescription = profileDescription;
  }

  getUserInfo() {
    const profileInfo = {
      name: this._userName.textContent,
      description: this._userDescription.textContent
    }
    return profileInfo;
  }

  setUserInfo({ name, description }) {
    this._userName.textContent = name;
    this._userDescription.textContent = description;
  }

}