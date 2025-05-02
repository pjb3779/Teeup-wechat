// pages/like/like.ts
Page({
    data: {
      active: 2,  // Chat 탭 인덱스,
      containerList: [0,1,2,3,4],
      nickName: "Ashley Robinson",
      userInfo: {
        avatarUrl: '',
    },
      isRated: false,
    },
    
    onShow() {
        const hasRated = getApp<IAppOption>().globalData.hasRated;
        if (hasRated) {
          this.setData({ isRated: true });
        }
    },

    handleRate(){
        this.setData({
            isRated: true
        })
    },

    goToRatePage() {
        wx.navigateTo({
          url: '/pages/rate/rate',
          success: () => {
            console.log("페이지 이동 성공");
          },
          fail: (err) => {
            console.error("페이지 이동 실패:", err);
            wx.showToast({ title: "페이지를 찾을 수 없습니다", icon: "none" });
          }
        });
    },
      
    onLoad() {
        const userInfo = getApp().globalData.userInfo;
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