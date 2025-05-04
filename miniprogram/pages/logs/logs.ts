// pages/index/index.ts
const APP = getApp<IAppOption>();

Page({
  data: {
    active: 0,
    userInfo: {
      avatarUrl: '',
      nickName: ''
    },
    currentLocation: '',
    showCalendar: false,
    showFilter: false,
    selectedDate: ''
  },

    onLoad() {
        const userInfo = APP.globalData.userInfo;
        this.setData({ userInfo });
    },

    chooseLocation() {
        wx.chooseLocation({
        success: (res) => {
            if (res.name) {
            // 장소명이 있으면 그대로 저장
            this.setData({
                currentLocation: res.name
            });
            } else {
            // 위도, 경도를 소수점 5자리로 고정 (number → string)
            const latNum = parseFloat(String(res.latitude));
            const lonNum = parseFloat(String(res.longitude));
            const fixedLat = latNum.toFixed(5);
            const fixedLon = lonNum.toFixed(5);

            this.setData({
                currentLocation: `${fixedLat}, ${fixedLon}`
            });
            }
        },
        fail: () => {
            wx.getLocation({
            type: 'gcj02',
            success: (loc) => {
                const latNum = parseFloat(String(loc.latitude));
                const lonNum = parseFloat(String(loc.longitude));
                const fixedLat = latNum.toFixed(5);
                const fixedLon = lonNum.toFixed(5);

                this.setData({
                currentLocation: `${fixedLat}, ${fixedLon}`
                });
            },
            fail: () => {
                wx.showToast({
                title: '위치 정보를 가져올 수 없습니다.',
                icon: 'none'
                });
            }
            });
        }
        });
    },

    // 팝업 열기/닫기
    onShowFilter() {
        console.log("필터 열기 클릭됨");
        this.setData({ showFilter: true });
    },
    onHideFilter() {
        this.setData({ showFilter: false });
    },


    // 1) 캘린더 열기
    onShowCalendar() {
        this.setData({ showCalendar: true });
    },

    // 2) 캘린더 닫기 (취소)
    onHideCalendar() {
        this.setData({ showCalendar: false });
    },

    // 3) 캘린더에서 날짜 확정
    onCalendarConfirm(e: any) {
        // event.detail = ['2022-02-08'] 또는 ['start','end'] 형식
        const dates = e.detail;
        this.setData({
        selectedDate: Array.isArray(dates) ? dates.join(' 至 ') : dates,
        showCalendar: false
        })
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
