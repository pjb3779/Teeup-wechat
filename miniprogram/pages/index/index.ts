// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Component({
  data: {
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  },
  methods: {
    onChooseAvatar(e: any) {
      const { avatarUrl } = e.detail
      const { nickName } = this.data.userInfo
      const hasInfo = nickName && avatarUrl && avatarUrl !== defaultAvatarUrl

      this.setData({
        "userInfo.avatarUrl": avatarUrl,
        hasUserInfo: hasInfo,
      })
    },
  
    onInputChange(e: any) {
      const nickName = e.detail.value
      const { avatarUrl } = this.data.userInfo
      const hasInfo = nickName && avatarUrl && avatarUrl !== defaultAvatarUrl
  
      this.setData({
        "userInfo.nickName": nickName,
        hasUserInfo: hasInfo,
      })

      console.log(nickName)
      console.log(hasInfo)

      if (hasInfo) {        
        getApp().globalData.userInfo = this.data.userInfo
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/logs/logs'
          })
        }, 0) // 렌더링 건너뛰고 바로 라우팅
      }      
    },
  }
  
})
