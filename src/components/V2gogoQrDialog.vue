<template>
  <div class="share-mask" v-if="show">
    <div class="qr-wrapper">
      <image class="qr" :class="{'minipPostion': isMiniProgram}" :src="config.staticPrefix + '/static/image/minip_QR.jpg'"></image>  
      <div class="text">识别小程序码<br/>进入小程序参与活动</div>
    </div>

    <image @click="handleClose" class="close" :src="config.staticPrefix + '/static/image/draw-lottery/close.png'"></image>    
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isMiniProgram: this.$v2gogo.isMiniProgram()
    }
  },
  methods: {
    handleClose(){
      this.$emit('update:show', false)
    },
  }
};
</script>

<style lang="scss" scoped>
.share-mask{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  .qr-wrapper{
    position: relative;
    left: 50%;
    top: 260rpx;
    transform: translateX(-50%);
    width: 462rpx;
    height: 522rpx;
    background: #FFFFFF;
    border-radius: 8rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80rpx 106rpx 60rpx;
    box-sizing: border-box;
    .qr{
      width: 252rpx;
      height: 252rpx;
    }
    .text {
      width: 252rpx;
      height: 80rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: #333333;
      margin-top: 50rpx;
      text-align: center;
      line-height: 40rpx;
    }
    
  }
  .close{  
    position: absolute;
    top: 940rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 68rpx;
    height: 68rpx;
  }
  
}
</style>