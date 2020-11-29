export class UserInfo {
  constructor({ profileName, profileDescription }) {
    this._userName = profileName;
    this._userDescription = profileDescription;
  }

  getUserInfo() {
    console.log('this._userName  ' + this._userName);
    console.log('this._userDescription  ' + this._userDescription);
    const profileInfo = {
      name: this._userName.textContent,
      description: this._userDescription.textContent
    }
    console.log('profileInfo  ' + profileInfo);
    return profileInfo;
  }

  setUserInfo({ name, description }) {
    this._userName.textContent = name;
    this._userDescription.textContent = description;
  }

}
