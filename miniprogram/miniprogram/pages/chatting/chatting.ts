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
  },
    // 검색 실행 시
    onSearch(e: any) {
        const value = e.detail.trim();
        if(!value){
            wx.showToast({ title: `검색어를 입력하세요. ${value}`, icon: 'none' });
        }
        else{
            wx.showToast({ title: `검색: ${value}`, icon: 'none' });
        }
        this.setData({ searchValue: value });
        // TODO: 실제 검색 로직 연결
      }
});