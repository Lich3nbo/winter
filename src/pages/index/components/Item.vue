<template>
  <div class="item-wrapper" @click="handleItem">
    <image class="thumbnail" :src="info.url"></image>
    <div class="name">{{info.name}}</div>
  </div>  
</template>

<script>
export default {
  props: {
    info: Object
  },
  methods: {
    handleItem(){
      const {id} = this.info;
      uni.navigateTo({
        url:`/pages/details/index?id=${id}`    
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.item-wrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 332rpx;
  height: 294rpx;
  box-shadow: 0px 4rpx 16rpx 0px rgba(0, 0, 0, 0.1);
  border-radius: 8rpx;
  margin-top: 30rpx;
  &:nth-child(even){
    margin-left: 22rpx;
  }
  .thumbnail{
    width: 100%;
    height: 220rpx;
    border-top-left-radius: 8rpx;
    border-top-right-radius: 8rpx;
  }
  .name{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28rpx;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333333;
  }
}
</style>