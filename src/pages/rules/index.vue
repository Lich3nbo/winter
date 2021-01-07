<template>
	<view class="container">
		<view class="title">活动规则</view>
		<view class="text">一、活动时间</view>
		<view class="text">2020年12月29日-2021年1月20日24:00</view>
		<view class="text">二、奖品</view>
		<view class="text">各参与景区门票</view>
		<view class="text">三、参与方式</view>
		<view class="text">通过微兔gogo App或者微兔gogo小程序 进入活动专区可参与活动。</view>
		<view class="text">四、参与步骤</view>
		<view class="text">助力贵州冬季旅游</view>
		<view class="text">进入活动专区，点击“我要助力”，助力成功后可参与抽奖活动。</view>
		<view class="text">随手拍</view>
		<view class="text">进入活动专区，点击“我要拍”，发布贵州冬季美景美食随手拍照片，审核通过有机会获得现金红包！</view>
		<view class="text">五、活动奖品发放</view>
		<view class="text">1、 景区门票：获得奖品后，在我的奖品中可以查看，到指定景区出示奖品页面，有工作人员确认后方可使用</view>
		<view class="text">2、 现金红包：获得红包后，在微兔gogoApp或小程序中红包中心，可以提现。</view>
		<view class="text">六、活动参与主体资格</view>
		<view class="text">1、活动期间，同一用户最多可获得2份中奖奖品。不同用户ID，用户存在下列情形的：包括但不限于同一手机号、同一设备、同一身份信息等，均视为同一用户，同一用户认定以平台认定结果为准，多余奖品自动失效。</view>
		<view class="text">2、活动期间若发现用户存在作弊、刷量等行为，平台有权判定该用户抽奖失败，撤销用户活动参与资格。</view>
	</view>
</template>

<script>
	let app = getApp();

	export default {
		components: {},
		data() {
			return {}
		},
		onLoad() {},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.container{
		padding-bottom: 240rpx;
		box-sizing: border-box;
		min-height: 100vh;
		padding-top: 42rpx;
	}
	.title {
		text-align: center;
		margin-top: 42rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #333333;
		line-height: 44rpx;

	}
	.text {
		padding: 0 62rpx;
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 40rpx;

	}
</style>
