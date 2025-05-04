/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    hasRated: boolean,
    userInfo?: WechatMiniprogram.UserInfo,
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}