const APP = getApp<IAppOption>()
Page({
    data: {
      active: 0,
      userInfo: {
        avatarUrl: '',
        nickName: '',
      },
    },
  
    onLoad() {
      const userInfo = APP.globalData.userInfo
      this.setData({
        userInfo
      })
    },
  
    onChange(event) {
      this.setData({ active: event.detail })
    }
  })
  
