<template>
  <div class="business-details" v-html="businessInfo.content">
  </div>
</template>

<script>
import Equity from "../../components/Equity";
import {request} from "@/utils/request";
export default {
  components: {
    Equity,
  },
  created() {
    this.getDetail()
  },
  data() {
    return {
      id: this.$v2gogo.getUrlParam('id'),
      businessInfo: {},
    };
  },
  methods: {
    getDetail() {
      request({
        url: `/tv/tvActivityGroup/getWqDetail?id=${this.id}`,
      }).then(res => {
        this.businessInfo = res.result;
      }, err => {

      })
    }
  }
};
</script>

<style lang="scss" scoped>
.business-details {
  width: 100%;
  padding: 0 40rpx;
  min-height: 100vh;
  padding-bottom: 264rpx;
  box-sizing: border-box;
  .picture{
    width: 100%;
    height: 496rpx;
    vertical-align: middle;
  }
  /deep/ img{
    max-width: 100%;
  }
  main {
    padding: 40rpx 62rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    .name { 
      font-size: 32rpx;
      font-weight: 600;
      color: #333333;
    }
    .content{
      padding-top: 32rpx !important;
      font-size: 24rpx !important;
      color: #333333 !important;
      line-height: 40rpx !important;

    }
    .other-wrapper{
      width: 100%;
      padding-top: 8rpx;
      .other{
        padding-top: 32rpx;
        display: flex;        
        align-items: center;
        .icon {
          width: 26rpx;
          height: 26rpx;
        }
        .label{
          margin-left: 12rpx;
          font-size: 24rpx;
          font-weight: 600;
          color: #333333;
        }
        .value{
          margin-left: 16rpx;
          font-size: 24rpx;
          color: #333333;
        }
      }

    }    
  }
}
</style>