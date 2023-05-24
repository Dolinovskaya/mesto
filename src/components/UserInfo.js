export default class UserInfo {
  constructor(profileConfig) {
    this._profileName = document.querySelector(profileConfig.profileNameSelector);
    this._profileJob = document.querySelector(profileConfig.profileJobSelector);
  }

  getUserInfo() {
    return { userNameInput: this._profileName.textContent, jobInput: this._profileJob.textContent }
  }

  setUserInfo(userData) {
    this._profileName.textContent = userData.userNameInput;
    this._profileJob.textContent = userData.jobInput;

  }
}
