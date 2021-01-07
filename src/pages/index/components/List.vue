<template>
  <div class="list-wrapper">
    <block v-for="(item, index) in list" :key="index">
      <item :info="item" />
    </block>
  </div>
</template>

<script>
import Item from './Item'
import {request} from "@/utils/request";
export default {
  props: {

  },
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      request({
        url: "/tv/tvActivityGroup/getWqList"
      }).then(res => {
        this.list = res.result;
      }, err => {

      })
    },
  },
  components: {
    Item
  }
}
</script>

<style lang="scss" scoped>
.list-wrapper{
  padding: 0 32rpx;
  display: flex;
  flex-wrap: wrap;
}
</style>