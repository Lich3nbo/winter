<template>
  <div class="banner">
    <image class="image" :src="config.staticPrefix + '/static/image/banner.png'" mode="scaleToFill" ></image>
    <div v-if="showMyPrize" class="banner-btn" style="top: 90rpx" @click="navToMyPrize">
      <div class="mask"></div>
      <div class="font">我的奖品</div>
    </div>
    <div class="banner-btn" style="top: 18rpx" @click="navToRule">
      <div class="mask"></div>
      <div class="font">活动规则</div>
    </div>
  </div>
</template>

<script>
  let app = getApp();
export default {
  data() {
    return {
      showMyPrize: (this.$v2gogo.isV2gogoApp() || this.$v2gogo.isMiniProgram()) && app.globalData.user.id
    }
  },
  methods: {
    navToMyPrize() {
      window.location.href = `/myPrize/index.html#/?userId=${app.globalData.user.id}`
    },
    navToRule() {
      uni.navigateTo({
        url: '/pages/rules/index'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.banner{
  position: relative;
  width: 100%;
  height: 348rpx;
  .image{
    width: 100%;
    height: 100%;
  }
}
.banner-btn {
  position: absolute;
  top: 0;
  right: 0;
}
.mask {
  width: 128rpx;
  height: 56rpx;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 100rpx 0 0 100rpx;
}
  .font {
    width: 96rpx;
    height: 32rpx;
    font-size: 24rpx;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #FFFFFF;
    position: absolute;
    top: 10rpx;
    left: 20rpx;
  }
</style>

