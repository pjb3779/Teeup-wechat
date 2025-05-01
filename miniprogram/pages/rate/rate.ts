Page({
    data: {
      star: 0,
      userName: "Ashley Robinson",
      avatarUrl: " ",
      tagOptions: [
        { label: "友善", active: false },          
        { label: "守时", active: false },          
        { label: "专业", active: false },          
        { label: "干净整洁", active: false },      
        { label: "沟通顺畅", active: false },      
        { label: "有责任感", active: false },      
        { label: "有礼貌", active: false },        
        { label: "值得信赖", active: false },      
        { label: "经验丰富", active: false },      
        { label: "态度积极", active: false },      
        { label: "配合度高", active: false },      
        { label: "乐于助人", active: false },      
        { label: "反应迅速", active: false },      
        { label: "守信用", active: false },        
        { label: "服务周到", active: false }       
      ],
      comment: "",
      showDialog: false,
      dialogTitle: "",      
      dialogMessage: ""
    },
  
    onRateChange(e: any) {
      this.setData({ star: e.detail });
    },
  
    toggleTag(e: any) {
      const idx = e.currentTarget.dataset.idx as number;
      const options = this.data.tagOptions as Array<{label: string; active: boolean}>;
      const activeCount = options.filter(o => o.active).length;
  
      if (options[idx].active) {
        options[idx].active = false;
      } else if (activeCount < 3) {
        options[idx].active = true;
      }
  
      this.setData({ tagOptions: options });
    },
  
    onCommentInput(e: any) {
      this.setData({ comment: e.detail.value });
    },
  
    goBack() {
      wx.switchTab({
        url: '/pages/like/like',
        success: () => console.log("탭바 이동 성공"),
        fail: (err) => console.error("탭바 이동 실패:", err),
      });
    },

    submitReview() {
        const text = this.data.comment.trim();
        if (!text) {
          // 코멘트가 비어있으면 경고 다이얼로그
          this.setData({
            dialogTitle: "提示",
            dialogMessage: "评论内容不能为空",
            showDialog: true
          });
          console.log("⚠️ 코멘트 없음 경고 다이얼로그");
        } else {
          // 정상 제출 다이얼로그
          this.setData({
            dialogTitle: "感谢您的评价",
            dialogMessage: "提交已完成，我们会继续努力！",
            showDialog: true
          });
          console.log("✅ 제출 완료 다이얼로그");
        }
    },
    
      
    onDialogClose() {
        console.log("✅ 다이얼로그 닫힘");     // 확인 버튼 눌린 후 확인용 로그
        this.setData({ showDialog: false });
    }
        
  });
  