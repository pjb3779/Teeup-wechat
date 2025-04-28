Page({
    data: {
        active: 3,  // Profile 탭 인덱스
        userInfo: {
          avatarUrl: '',
          nickName: '',
          city: '',
          country: '',
          gender: 0,
          language: 'en',
          golf_avg: 0,
          age: 0
        },
      },
    
    onLoad() {
      const APP = getApp();
      const userInfo = APP.globalData.userInfo;
      console.log('Loaded userInfo:', userInfo);  // userInfo 객체 확인
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