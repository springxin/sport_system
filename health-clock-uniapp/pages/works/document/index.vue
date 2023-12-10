<template>
	<view class="repair">
		<view class="repair-list" v-for="(item,index) in tableData" :key="index" v-if="!isEmpty">
			<view class="row" @tap="navToDetail(item)">
				<view class="carrier">
					<view class="repair-wrapper">
						<view class="title in1line">
							<template>摄入卡路里（千焦）</template>
							-
							<template>{{item.intakeCalorie}}</template>
						</view>
						<view class="title in1line">
							<template>消耗卡路里（千焦）</template>
							-
							<template>{{item.consumeCalorie}}</template>
						</view>
						<view class="time">{{item.createTime}}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="helperList" v-if="isEmpty">
			<oa-empty info="暂无数据"></oa-empty>
		</view>

		<view class="add-round bg-deepBlue" :class="'bg-' + themeColor.name" @click="navToAdd()">
			<text class="cuIcon-add text-xxl"></text>
		</view>
	</view>

</template>

<script>
	import oaEmpty from '@/components/oa-empty';
	import requests from '@/utils/requests.js'
	export default {
		components: {
			oaEmpty
		},
		data() {
			return {
				isAdmin: '',
				isEmpty: false,
				tableData: [],
				searchParameters: {
					pageNum: 1,
					pageSize: 50,
					userId: uni.getStorageSync('userInfo').userId
				},

			};
		},

		filters: {
		},

		onShow() {
			this.isAdmin = uni.getStorageSync('userInfo').userName;
			this.initData();
		},
		methods: {
			getList() {
				let that = this
				requests.getClock(that.searchParameters).then(res => {
					if (res && res.code === 200) {
						that.tableData = res.rows;
						if (that.tableData.length === 0) {
							that.isEmpty = true;
						} else {
							that.isEmpty = false;
						}
					}

				})
			},
			// 数据初始化
			initData() {
				uni.setNavigationBarColor({
					frontColor: '#ffffff',
					backgroundColor: this.themeColor.color,
					animation: {
						duration: 400,
						timingFunc: 'easeIn'
					}
				})
				this.getList()
			},

			// 详情
			navToDetail(val) {
				console.log(val)
				uni.navigateTo({
					url: './detail?item=' + JSON.stringify(val)
				})

			},

			// 添加
			navToAdd() {
				uni.navigateTo({
					url: './add?type=' + 1
				})
			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: $page-color-base;
	}

	.repair {

		.add-round {
			position: fixed;
			z-index: 999;
			right: 30rpx;
			bottom: 30rpx;
			border-radius: 50%;
			width: 120rpx;
			height: 120rpx;
			color: #fff;
			text-align: center;
			line-height: 120rpx;
			font-weight: 100;
			font-size: 80rpx;
		}

		.repair-list {
			margin-top: 20upx;

			.row {
				width: calc(94%);
				height: calc(22vw + 40upx);
				margin: 0 auto $spacing-base;
				border-radius: 15upx;
				box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
				display: flex;
				align-items: center;
				position: relative;
				overflow: hidden;
				z-index: 4;
				border: 0;

				.carrier {
					@keyframes showMenu {
						0% {
							transform: translateX(0);
						}

						100% {
							transform: translateX(-30%);
						}
					}

					@keyframes closeMenu {
						0% {
							transform: translateX(-30%);
						}

						100% {
							transform: translateX(0);
						}
					}

					background-color: #fff;
					position: absolute;
					width: 100%;
					padding: 0 0;
					height: 100%;
					z-index: 3;
					display: flex;
					align-items: center;
				}
			}

			.repair-wrapper {
				background-color: $color-white;
				width: 100%;
				padding: $spacing-base $spacing-lg $spacing-base $spacing-lg;
				margin: $spacing-base 0 0;
				border-radius: 15upx;
				position: relative;

				.title {
					font-size: $font-lg;
					color: $font-color-dark;
					font-weight: 500;
					margin: 0 0 $spacing-sm;
				}

				.content {
					font-size: $font-sm;
					color: $font-color-base;
					height: 75upx;
					line-height: 36upx;
				}

				.time {
					font-size: $font-base;
					color: $font-color-light;
				}

			}
		}

	}
</style>
