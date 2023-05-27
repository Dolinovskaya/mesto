export default class UserInfo {
  constructor(profileConfig) {
    this._profileName = document.querySelector(profileConfig.profileNameSelector);
    this._profileJob = document.querySelector(profileConfig.profileJobSelector);
    this._profileAvatar = document.querySelector(profileConfig.profileAvatarSelector);
  }

  getUserInfo() {
    return { userName: this._profileName.textContent, userJob: this._profileJob.textContent }
  }

  setUserInfo({userName, userJob, userAvatar}) {
    this._profileName.textContent = userName;
    this._profileJob.textContent = userJob;
    this._profileAvatar.src = userAvatar;
  }

  setUserId(id) {
    this._userId = id;
  }

  getUserId() {
    return this._userId;
  }
}
