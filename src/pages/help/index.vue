<template>
  <div class="help-wrapper">
    <equity position="top" />
    <div class="content">
      <image class="success-image" :src="config.staticPrefix + '/static/image/help/success.png'" ></image>
      <div v-if="first" class="success-text color-orange">助力成功</div>
      <div v-if="!first"class="success-text color-orange">已 助 力</div>
      <div v-if="userRanking" class="ranking">你是第<span class="color-orange">{{ userRanking }}</span>位助力者</div>
      <div v-if="lotteryNumber > 0" class="draw-btn" @click="handleDrawLottery">抽奖</div>
    </div>
    <!-- 中奖弹框 -->
    <draw-lottery-dialog
            :show.sync="drawLotteryDialogShow"
            :mode="mode"
            :can-add-share-num="canAddShareNum"
            :winnerPrizeName="winnerPrizeName"
            @handleShare="handleDialogShare" />
    <!-- 分享弹框 -->
    <share-dialog :show.sync="shareDialogShow" @shareDialogClose="addShare"></share-dialog>
  </div>
</template>

<script>
import Equity from "../../components/Equity";
import DrawLotteryDialog from "../../components/DrawLotteryDialog";
import ShareDialog from "../../components/ShareDialog";
import {request} from "@/utils/request";
let app = getApp();
export default {
  components: {
    Equity,
    DrawLotteryDialog,
    ShareDialog,
  },
  data() {
    return {
      // 提醒分享
      canAddShareNum: true,
      // 第一次助力
      first: false,
      // 用户排名
      userRanking: app.globalData.lotteryInfo.userRanking,
      // 用户可抽奖次数
      lotteryNumber: app.globalData.lotteryInfo.lotteryNumber,
      mode: 'winner',
      drawLotteryDialogShow: false,
      winnerPrizeName: '温泉家庭套票一份(2大1小)',
      // 分享
      shareDialogShow: false
    }
  },
  onLoad(options){
    this.doHelp();
  },
  onShow() {
    app.loginCheck();
  },
  methods: {
    addShare() {
      // 增加分享次数
      request({
        url: `/tv/tvActivityGroup/addShare?userId=${app.globalData.user.id}&id=${app.globalData.activityGroupId}`
      }).then(res => {
        app.initLotteryNumber(() => {
          this.userRanking = app.globalData.lotteryInfo.userRanking;
          this.lotteryNumber = app.globalData.lotteryInfo.lotteryNumber;
          this.canAddShareNum = false;
        });
      });
    },
    // 助力
    doHelp() {
      if (this.userRanking > 0) {
        return;
      }
      request({
        url: `/tv/tvActivityGroup/addUserRanking?userId=${app.globalData.user.id}&id=${app.globalData.activityGroupId}`,
      }).then((res) => {
        app.initLotteryNumber(() => {
          this.userRanking = app.globalData.lotteryInfo.userRanking;
          this.lotteryNumber = app.globalData.lotteryInfo.lotteryNumber;
        });
        this.first = true;
      }, err => {

      })
    },
    handleDrawLottery() {
      if (this.lotteryNumber < 1) {
        return;
      }
      request({
        url: `/tv/tvActivityGroup/lottery?userId=${app.globalData.user.id}&id=${app.globalData.activityGroupId}`,
        needFailToast: false
      }).then(res => {
        // code == 0 中奖
        this.mode = "winner";
        this.winnerPrizeName = res.result.prizeName;
        this.drawLotteryDialogShow = true;
        this.lotteryNumber = this.lotteryNumber - 1;
        app.initLotteryNumber();
      }, err => {
        this.mode = "losing";
        this.drawLotteryDialogShow = true;
        this.lotteryNumber = this.lotteryNumber - 1;
        app.initLotteryNumber();
      });
    },
    handleDialogShare(){
      // 显示弹框
      this.drawLotteryDialogShow = false;
      setTimeout(() => {
        this.shareDialogShow = true;  
      }, 500);
      
    },
  },
}
</script>

<style lang="scss" scoped>
.help-wrapper{
  min-height: 100vh;
  padding-top: 244rpx;
  box-sizing: border-box;
  .content{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 46rpx;
    .success-image{
      width: 274rpx;
      height: 188rpx;
    }
    .success-text{
      margin-top: 16rpx;
      font-size: 48rpx;
      font-weight: 600;
    }
    .ranking{
      padding-top: 32rpx;
      font-size: 32rpx;
    }
    .color-orange{
      color: #FFA147;
    }
    .draw-btn{
      width: 462rpx;
      height: 68rpx;
      margin-top: 130rpx;
      background: #FFA147;
      border-radius: 34rpx;
      font-size: 32rpx;
      font-weight: 600;
      color: #FFFFFF;
      line-height: 68rpx;
      text-align: center;
      letter-spacing: 2rpx;
    }
  }
}
</style>