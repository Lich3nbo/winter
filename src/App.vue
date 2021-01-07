<script>
import sa from "sa-sdk-javascript";
import utils from "@/utils";
import {request} from "@/utils/request";
export default {
	onLaunch: function() {
        sa.init({server_url: "http://data.v2gogo.com:8006/sa?project=production"});
        // sensorsdata埋点
        sa.quick("autoTrack"); // 自动采集$pageview事件
	},
	onShow: function() {
		console.log('App Show')
	},
	onHide: function() {
		console.log('App Hide')
	},
	globalData: {
	    activityGroupId: '9a7ec27118d94acfa2a5c85796f7a712', // 'e32540fa675b4f1595a7ab3e5ac2341d',
		user: null,
        lotteryInfo: null
	},
	methods: {
        getUser(callback) {
            let user = this.globalData.user;
            if (!this.globalData.user || !this.globalData.user.id) {
              if(this.$v2gogo.isV2gogoApp()){
                user = this.$v2gogo.getUser();
              }else if(this.$v2gogo.isMiniProgram()) {
                user = this.$v2gogo.getMiniProgramUser();
              }
            }
            if(user) {
                this.globalData.user = user;
                this.initLotteryNumber(callback);
            } else {
                // utils.showToast('未获取到用户信息');
            }
        },
        initLotteryNumber(callback) {
          request({
            url: `/tv/tvActivityGroup/getLotteryNumberByIdAndUserId?userId=${this.globalData.user.id}&id=${this.globalData.activityGroupId}`
          }).then(res => {
            this.globalData.lotteryInfo = res.result;
            if (callback) {
              callback();
            }
          }, err => {

          })
        },
        loginCheck() {
          if (this.globalData.user && this.globalData.user.id) {
            return true;
          }
          if (this.$v2gogo.isV2gogoApp()) {
            this.$v2gogo.appLogin()
          } else if (this.$v2gogo.isMiniProgram()) {
            jWeixin.miniProgram.navigateTo({
              url: '/pages/login/login'
            });
          }
          return false;
        }
		
	},
	
}
</script>

<style>
	/*每个页面公共css */
</style>
