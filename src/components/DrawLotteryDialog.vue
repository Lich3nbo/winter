<template>
  <div class="draw-lottery-mask" v-if="show">
    <block v-if="mode === 'winner'">
      <div class="winner-wrapper">
        <image class="winner-bg" :src="config.staticPrefix + '/static/image/draw-lottery/winner.png'"></image>
        <div class="winner-text">
          {{winnerPrizeName}}
        </div>
        <div class="share-btn" @click="handleShare">分享再抽一次</div>
        <div class="close-wrapper"  @click="handleClose">
          <image class="close" :src="config.staticPrefix + '/static/image/draw-lottery/close.png'"></image>    
        </div>
      </div>
    </block>
    <block v-if="mode === 'losing'">
      <div class="losing-wrapper">
        <image class="losing-bg" :src="config.staticPrefix + '/static/image/draw-lottery/losing.png'"></image>
        <div class="losing-text">很遗憾您未中奖</div>
        <div v-if="canAddShareNum" class="share-btn" @click="handleShare">分享再抽一次</div>
        <div v-if="!canAddShareNum" class="share-btn" @click="handleShare">谢谢参与, 分享给朋友吧</div>
        <div class="close-wrapper" @click="handleClose">
          <image class="close" :src="config.staticPrefix + '/static/image/draw-lottery/close.png'"></image>    
        </div>
      </div>
    </block>
    
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    canAddShareNum: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: 'winner'
    },
    winnerPrizeName: {
      type: String,
      default: 'winner'
    },
  },
  methods: {
    handleShare(){
      this.$emit('handleShare');
    },
    handleClose(){
      console.log(1);
      this.$emit('update:show', false);
    },
  }
};
</script>

<style lang="scss" scoped>
.draw-lottery-mask{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  .winner-wrapper,.losing-wrapper{
    position: relative;
    display: flex;
    justify-content: center;
    left: 50%;
    transform: translateX(-50%);
  }
  // 中奖
  .winner-wrapper{
    width: 642rpx;
    height: 586rpx;
    top: 196rpx;
    
    .winner-bg{
      position: absolute;
      width: 642rpx;
      height: 586rpx;
    }
    .winner-text{
      position: absolute;
      top: 314rpx;
      font-size: 32rpx;
      font-weight: 600;
      color: #484848;
      z-index: 1;
    }
    .share-btn{
      position: absolute;
      width: 466rpx;
      height: 80rpx;
      background: #FEF277;
      border-radius: 40rpx;
      bottom: 60rpx;
      font-size: 32rpx;
      font-weight: 600;
      color: #8C5501;
      line-height: 80rpx;
      text-align: center;
    }
  }
  .losing-wrapper{
    width: 606rpx;
    height: 402rpx;
    background: #FFFFFF;
    border-radius: 20rpx;
    top: 380rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    .losing-bg{
      position: absolute;
      width: 188rpx;
      height: 218rpx;
      left: 50%;
      top:-40%;
      transform: translateX(-50%);
    }
    .losing-text{
      position: absolute;
      top: 140rpx;
      font-size: 40rpx;
      font-weight: 600;
      color: #484848;
      line-height: 56rpx;
    }
    .share-btn{
      position: absolute;
      bottom: 60rpx;
      margin-top: 66rpx;
      width: 466rpx;
      height: 80rpx;
      background: #FEF277;
      border-radius: 40rpx;
      font-size: 32rpx;
      font-weight: 600;
      color: #8C5501;
      line-height: 80rpx;
      text-align: center;
    }
  }
  .close-wrapper{
    position: absolute;
    bottom: -120rpx;
    left: 50%;
    transform: translateX(-50%);
    .close{
      width: 68rpx;
      height: 68rpx;
    }
  }
  
}
</style>