<template>
  <div class="equity-wrapper" :class="position" >
    <image class="image" :src="config.staticPrefix + '/static/image/equity.png'" ></image>
  </div>
</template>

<script>
export default {
  props: {
    position: {
      type: String,
      default: 'bottom'
    }
  }
}
</script>

<style lang="scss" scoped>
.equity-wrapper{
  position: fixed;
  left: 0;
  right: 0;
  .image{
    width: 100%;
    height: 244rpx;
    vertical-align: middle;
  }
  
}
.bottom{
  bottom: 0;
}
.top{
  top: 0;
}
</style>