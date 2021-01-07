<template>
  <div class="share-mask" v-if="show">
    <image class="share-arrow" :class="{'minipPostion': isMiniProgram}" :src="config.staticPrefix + '/static/image/arrow.png'"></image>
    <div class="share-text">点击右上角分享给好友吧</div>
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
      this.$emit('shareDialogClose', true);
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
  .share-arrow{
    position: absolute;
    width: 258rpx;
    height: 324rpx;
    right: 20rpx;
    top: 10rpx;
  }
  .minipPostion{
    right: 94rpx;
  }

  .share-text{
    position: absolute;
    top: 364rpx;
    left: 50%;
    transform: translateX(-50%);
    font-size: 36rpx;
    color: #FFFFFF;
    white-space: nowrap;
  }
  .close{  
    position: absolute;
    bottom: 274rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 68rpx;
    height: 68rpx;
  }
  
}
</style>