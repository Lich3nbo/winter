<template>
	<view class="container">
		<banner />
		<list></list>
		<footer-card ref="footerCard" @showQrDialog="showQrDialogEvent" />
		<v2gogo-qr-dialog :show.sync="v2gogoQrDialogShow"></v2gogo-qr-dialog>
	</view>
</template>

<script>
	import Banner from './components/Banner'
	import List from './components/List'
	import FooterCard from './components/FooterCard'
	import V2gogoQrDialog from '../../components/V2gogoQrDialog'

	let app = getApp();

	export default {
		components: {
			List,
			Banner,
			FooterCard,
			V2gogoQrDialog
		},
		data() {
			return {
				v2gogoQrDialogShow: false,
				list: [],
			}
		},
		onLoad() {
			const shareInfo = {
				title : "助力多彩贵州· 乐享温暖人生",
				desc : '2020贵州冬季旅游推介活动，参与助力，赢取冬季旅游热门景区门票！',
				imgUrl : 'https://app.v2gogo.com/winter-tourism/static/image/sharePic.jpg',
				url : 'https://app.v2gogo.com/winter-tourism/index.html'
			};
			this.$v2gogo.initAppShareBtn(shareInfo, uni);
		},
		onShow() {
			app.getUser();
			this.$nextTick(() =>  {
				this.$refs.footerCard.initLotteryNumber();
			})
		},
		methods: {
			showQrDialogEvent(val)  {
				if (val) {
					this.v2gogoQrDialogShow = true;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		padding-bottom: 240rpx;
		box-sizing: border-box;
		min-height: 100vh;
	}
</style>
