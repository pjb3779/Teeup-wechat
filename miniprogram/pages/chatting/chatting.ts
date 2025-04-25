Page({
  data: {
    active: 1,  // Chat 탭 인덱스
    userInfo: {
      avatarUrl: '',
      nickName: '',
    },
  },
  
  onLoad() {
    const userInfo = APP.globalData.userInfo;
    this.setData({ userInfo });
  },

  change(event: any) {
    const index = event.detail;
    if (index === this.data.active) return;
  
    const urls = [
      '/pages/logs/logs',
      '/pages/chatting/chatting',
      '/pages/like/like',
      '/pages/profile/profile'
    ];
  
    wx.switchTab({ url: urls[index] });
  }
  
});