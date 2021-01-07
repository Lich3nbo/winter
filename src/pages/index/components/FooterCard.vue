<template>
  <div class="footer-wrapper">
    <block v-for="(item,index) in cardData" :key="index">
      <div class="card-wrapper">
        <div v-if="userRanking > 0 && index == 1" class="help-container" :data-action="item.action" @click="handleBtn" >
          第<span class="help-number">{{userRanking}}</span>位助力者
        </div>
        <div v-else class="btn" :data-action="item.action" @click="handleBtn" >
          {{item.btnText}}
        </div>
        <div class="line"></div>
        <div class="desc-wrapper">
          <image class="icon" :src="config.staticPrefix + item.icon"></image>
          <span class="text">{{item.desc}}</span>
        </div>
      </div>
    </block>
  </div>
</template>

<script>
import utils from "../../../utils";
let app = getApp();
export default {
  created() {
    this.initLotteryNumber();
  },
  data () {
    return {
      userRanking: '',
      textChange: this.userRanking > 0,
      cardData: [
        {
          btnText: '我要拍',
          desc: '分享贵州冬季美景领取现金红包',
          icon: '/static/image/red_packet.png',
          action: 'disclose'
        },
        {
          btnText: '我要助力',
          desc: '助力贵州冬季旅游赢取景区免费门票',
          icon: '/static/image/gift.png',
          action: 'help'
        }
      ]
    }
  },
  methods: {
    initLotteryNumber() {
      app.getUser(() => {
        this.userRanking = app.globalData.lotteryInfo.userRanking;
      });
    },
    handleBtn(e){
      const { action } = e.currentTarget.dataset;
      switch (action){
        case 'disclose':
          this.navToBrokeNews();
          break;
        case 'help':
          this.help();
          break;
        default:
          utils.showToast('开发中')
          break;
      }
    },
    help() {
      if (this.$v2gogo.isV2gogoApp() || this.$v2gogo.isMiniProgram()) {
        if (!app.loginCheck()) {
          return;
        }
        uni.navigateTo({
          url: '/pages/help/index'
        })
      } else {
        this.$emit('showQrDialog', true);
      }
    },
    navToBrokeNews() {
      if (this.$v2gogo.isV2gogoApp()) {
        window.location.href = 'v2gogo://?type=28&typeCode=125';
      } else if (this.$v2gogo.isMiniProgram()) {
        jWeixin.miniProgram.switchTab({
          url: '/pages/disclose/disclose'
        });
      } else {
        this.$emit('showQrDialog', true);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.footer-wrapper{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16rpx;
  border-top: 2rpx solid #E4E4E4;
  background-color: #FFFFFF;
  .card-wrapper{
    width: 350rpx;
    height: 188rpx;
    background: #FFA147;
    border-radius: 8rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .btn{
      width: 250rpx;
      height: 60rpx;
      background: #FFFFFF;
      border-radius: 36rpx;
      font-size: 32rpx;
      font-weight: 600;
      color: #FFA147;
      line-height: 66rpx;
      text-align: center;
    }
    .line{
      width: 250rpx;
      height: 2rpx;
      background: rgba($color: #fff, $alpha: .3);
      margin: 20rpx 0 8rpx;
    }
    .desc-wrapper{
      padding: 0 42rpx;
      display: flex;
      align-items: center;
      .icon { 
        width: 60rpx;
        height: 60rpx;
      }
      .text{
        flex: 1;
        margin-left: 6rpx;
        font-size: 24rpx;
        color: rgba($color: #fff, $alpha: .8);
      }
    }
  }
}
  .help-container {
    letter-spacing: 2rpx;
    font-size: 28rpx;
    color: #ffffff;
    height: 60rpx;
  }
  .help-number {
    font-size: 40rpx;
  }
</style>