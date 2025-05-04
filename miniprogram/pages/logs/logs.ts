// pages/index/index.ts
const APP = getApp<IAppOption>();
import { areaList } from '@vant/area-data';

function pad(n: number) {
    if (n < 10) {
        return '0' + n;
    } 
    else {
        return String(n);
    }
}

Page({
  data: {
    active: 0,
    userInfo: {
      avatarUrl: '',
      nickName: '',
    },
    currentLocation: '',
    showCalendar: false,
    showFilter: false,
    showArea: false,
    selectedDate: '',
    areaList,    
    areaCode: '',   
    areaName: '',    
    gender: '',
    genderOptions: [
        { text: '男性', value: '男性' },
        { text: '女性', value: '女性' }
    ],
    age: 0,
    ageOptions: Array.from({ length: 51 }, (_, i) => {
        const age = i + 20;
        return { text: `${age}岁`, value: age };
    }),
    golfScore: 0,
    golfScoreOptions: Array.from({ length: 51 }, (_, i) => {
        const score = 120 - i;  // 120부터 70까지
        return {
          text: `${score}杆`, // 중국어로 '몇 타' 의미
          value: score,
        };
      }),
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

    // 캘린더
    onShowCalendar() {
        this.setData({ showCalendar: true });
    },
    onHideCalendar() {
        this.setData({ showCalendar: false });
    },
    onCalendarConfirm(e: WechatMiniprogram.CustomEvent) {
        const detail = e.detail; // Date | Date[] 
    
        let formatted = '';
        if (detail instanceof Date) {
          const d = detail;
          formatted = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
        }
        this.setData({
          selectedDate: formatted,
          showCalendar: false,
        });
    },

    // 지역
    onShowArea(){
        console.log("지역 열기 클릭됨");
        this.setData({showArea: true});
    },
    onHideArea() {
        this.setData({ showArea: false });
    },

    onAreaConfirm(event: WechatMiniprogram.CustomEvent) {
        const values = event.detail.values as Array<{ code: string; name: string }>;
        const names = values.map(d => d.name).join(' ');
        const lastCode = values.length > 0
          ? values[values.length - 1].code
          : '';
    
        this.setData({
          areaName: names,
          areaCode: lastCode,
          showArea: false,
        });
    },

    // 필터 항목들
    onGenderChange(event: WechatMiniprogram.CustomEvent){
        const selectedGender = event.detail;
        this.setData({
            gender: selectedGender
        })
    },

    onAgeChange(event: WechatMiniprogram.CustomEvent){
        const selectedAgeChange = event.detail;
        this.setData({
            age: selectedAgeChange
        })
    },

    onGolfScoreChange(event: WechatMiniprogram.CustomEvent) {
        const selectedgolfScore = event.detail;
        this.setData({ 
            golfScore: event.detail 
        });
    },


    // 최종 필터 확인
    onFilterConfirm() {
        this.setData({
            showFilter: false
        });
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
