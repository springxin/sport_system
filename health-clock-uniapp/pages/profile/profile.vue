<template>
	<view class="user">
		<!--头部-->
		<view class="user-section" :class="'bg-' + themeColor.name">
			<image class="bg" :src="userBg"></image>
			<!--用户信息-->
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" :src="userInfo.avatar"></image>
					<text class="username">
						<template>{{userInfo.userName}}  </template>
					</text>
				</view>
			</view>
		</view>
		<!-- 个人中心 内容区-->
		<view class="cover-container" :style="[
			{
				transform: coverTransform,
				transition: coverTransition
			}
		]" @touchstart="coverTouchstart" @touchmove="coverTouchmove" @touchend="coverTouchend">
			<image class="arc" :src="arc"></image>
			<!-- 个人资料 -->
			<view class="set">
				<view class="list-cell b-b" :class="{ 'm-t': item.class === 'mT' }" v-for="item in setList"
					:key="item.title" @tap="navTo(item.url)" hover-class="cell-hover" :hover-stay-time="50">
					<text class="cell-tit">{{ item.title }}</text>
					<text class="cell-tip">{{ item.content }}</text>
					<text class="cell-more iconfont iconyou"></text>
				</view>

			</view>
			<view class="list-cell log-out-btn" :class="'text-' + themeColor.name" @tap="toLogout">
				<text class="cell-tit">退出登录</text>
			</view>

		</view>
	</view>
</template>
<script>
	import {
		mapMutations
	} from 'vuex';
	import listCell from '@/components/oa-list-cell';
import requests from '../../utils/requests';
	let startY = 0,
		moveY = 0,
		pageAtTop = true;
	export default {
		components: {
			listCell
		},
		data() {
			return {
				colorModal: false,
				mycenterList: this.$mConstDataConfig.mycenterList,
				themeList: this.$mConstDataConfig.themeList,
				setList: [{
						id: 1,
						url: '../user/userinfo/userinfo',
						title: '资料信息',
						content: '',
					},
					{
						id: 2,
						url: '../public/password',
						title: '修改密码',
						content: '',
					},
				],
				headImg: this.$mAssetsPath.headImg,
				userBg: this.$mAssetsPath.userBg,
				vipCardBg: this.$mAssetsPath.vipCardBg,
				arc: this.$mAssetsPath.arc,
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				userInfo:{},
			};
		},
		async onShow() {
			// 初始化数据
			await this.initData();
			this.userInfo = uni.getStorageSync('userInfo')
		},
		onLoad() {
			// #ifdef APP-PLUS
			if (uni.getSystemInfoSync().platform === 'ios') {
				this.CustomBar = 0;
			}
			// #endif
		},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.navTo('/pages/set/set');
			} else if (index === 1) {}
		},
		// #endif
		methods: {
			toLogout() {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定退出登录吗?',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							uni.showLoading({
								title: '退出中...'
							});
							// that.ajax(that.url.logout, 'POST', {}, function(resp) {
							// 	if (resp.data.code === 200 && resp.statusCode === 200) {
							// 		uni.showToast({
							// 			title: resp.data.msg,
							// 			icon: 'success',
							// 		})
							// 		uni.hideLoading();
							// 		that.disabledLogin = false
							// 		uni.reLaunch({
							// 			url: '../public/login'
							// 		})
							// 		uni.removeStorageSync('token')
							// 		uni.removeStorageSync('userInfo')

							// 	} else {
							// 		uni.showToast({
							// 			title: resp.data.msg,
							// 			icon: 'none',
							// 		})
							// 		uni.hideLoading();
							// 	}

							// });
							requests.logout().then(res => {
									if (res && res.code === 200) {
										uni.showToast({
											title: res.msg,
											icon: 'success',
										})
										uni.hideLoading();
										that.disabledLogin = false
										uni.reLaunch({
											url: '../public/login'
										})
										uni.removeStorageSync('token')
										uni.removeStorageSync('userInfo')
								
									} else {
										uni.showToast({
											title: res.msg,
											icon: 'none',
										})
										uni.hideLoading();
									}
							})
						} else {
							uni.hideLoading();
						}
					},
					fail() {
						uni.hideLoading();
					},
					complete() {
						setTimeout(() => {
							uni.hideLoading();
						}, 12000)
					}
				})
			},
			handleTip(isNewVersion) {
				this.isNewVersion = isNewVersion;
			},
			handleVersionUpgradeShow() {
				this.isVersionUpgradeShow = false;
			},
			// 数据初始化
			async initData() {
				// this.user = uni.getStorageSync('user');
				// 缓存大小
				// this.setList[2].content = `${uni.getStorageInfoSync().currentSize} kb`;
				// // #ifdef APP-PLUS
				// this.setList[5].content = `当前版本 V1.0.0`;
				// // #endif
				this.hasLogin = false;
				uni.setTabBarStyle({
					selectedColor: this.themeColor.color,
					borderStyle: 'white'
				});
				uni.setNavigationBarColor({
					frontColor: '#ffffff',
					backgroundColor: this.themeColor.color,
					animation: {
						duration: 400,
						timingFunc: 'easeIn'
					}
				});
				this.themeColor.tabList && this.themeColor.tabList.forEach((selectedIconPath, index) => {
					uni.setTabBarItem({
						index,
						selectedIconPath
					});
				});

			},

			showColorModal() {
				this.colorModal = true;
			},
			SetColor(item) {
				this.colorModal = false;
				this.themeColor = item;
				this.$mStore.commit('setThemeColor', item);
				uni.setNavigationBarColor({
					frontColor: '#ffffff',
					backgroundColor: this.themeColor.color,
					animation: {
						duration: 400,
						timingFunc: 'easeIn'
					}
				});
				uni.setTabBarStyle({
					selectedColor: this.themeColor.color,
					borderStyle: 'white'
				});
				this.themeColor.tabList && this.themeColor.tabList.forEach((selectedIconPath, index) => {
					uni.setTabBarItem({
						index,
						selectedIconPath
					});
				});
			},

			// 统一跳转
			navTo(url) {
				console.log(url)
				uni.navigateTo({
					url: url
				})
			},

			coverTouchstart(e) {
				if (pageAtTop === false) {
					return;
				}
				this.coverTransition = 'transform .1s linear';
				startY = e.touches[0].clientY;
			},
			coverTouchmove(e) {
				moveY = e.touches[0].clientY;
				let moveDistance = moveY - startY;
				if (moveDistance < 0) {
					this.moving = false;
					return;
				}
				this.moving = true;
				if (moveDistance >= 80 && moveDistance < 100) {
					moveDistance = 80;
				}
				if (moveDistance > 0 && moveDistance <= 80) {
					this.coverTransform = `translateY(${moveDistance}px)`;
				}
			},
			coverTouchend() {
				if (this.moving === false) {
					return;
				}
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
				this.coverTransform = 'translateY(0px)';
			},


		}
	};
</script>
<style lang="scss" scoped>
	page {
		background-color: $page-color-base;
	}

	.user {
		.promotion-center {
			background: #fff;
			margin-bottom: 20upx;

			/*分类列表*/
			.category-list {
				width: 100%;
				padding: 0 0 30upx 0;
				border-bottom: solid 2upx #f6f6f6;
				display: flex;
				flex-wrap: wrap;

				.category {
					width: 33.3%;
					margin-top: 50upx;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;

					.img {
						width: 100%;
						display: flex;
						justify-content: center;

						.iconfont {
							font-size: $font-lg + 24upx;
						}
					}

					.text {
						width: 100%;
						display: flex;
						justify-content: center;
						font-size: 24upx;
						color: #3c3c3c;
					}

					.share-btn {
						height: 142upx;
						text-align: left;
						background: none;
						padding: 0;
						margin: 0;
					}

					.share-btn:after {
						border: none;
						border-radius: none;
					}
				}
			}
		}

		.order-section {
			@extend %section;
			padding: 28upx 0;

			.order-item {
				@extend %flex-center;
				width: 120upx;
				height: 120upx;
				border-radius: 10upx;
				font-size: $font-sm;
				color: $font-color-dark;
				position: relative;
			}

			.badge {
				position: absolute;
				top: 0;
				right: 4upx;
			}

			.iconfont {
				font-size: 48upx;
			}

			.icon-shouhoutuikuan {
				font-size: 44upx;
			}
		}

		.no-foot-print {
			text-align: center;
			padding: 48upx 0;

			.no-foot-print-icon {
				font-size: $font-lg + 2upx;
				margin-right: 10upx;
			}
		}

		.set {
			padding: $spacing-base 0;

		}

		.cu-list.card-menu {
			margin: $spacing-base 0;

			.title {
				margin-left: $spacing-base;
			}
		}

		.user-section {
			height: 520upx;
			padding: 100upx 30upx 0;
			position: relative;

			.bg {
				position: absolute;
				left: 0;
				top: 0;
				width: 100vw;
				height: 60vw;
				opacity: 0.84;
			}

			.user-info-box {
				height: 180upx;
				display: flex;
				align-items: center;
				position: relative;
				z-index: 1;
				justify-content: space-between;

				.portrait-box {
					display: flex;
					align-items: center;

					.portrait {
						width: 130upx;
						height: 130upx;
						border: 5upx solid #fff;
						border-radius: 50%;
					}

					.username {
						font-size: $font-lg + 6upx;
						color: $color-white;
						margin-left: 20upx;
					}

					button {
						background-color: transparent;
						font-size: $font-lg + 6upx;
						color: $font-color-dark;
						border: none;
					}

					button::after {
						border: none;
					}
				}
			}

			.vip-card-box {
				display: flex;
				flex-direction: column;
				color: #f7d680;
				height: 240upx;
				background: url('/static/vip-card.png');
				background-size: 100% 100%;
				border-radius: 16upx 16upx 0 0;
				overflow: hidden;
				position: relative;
				padding: 20upx 24upx;

				.b-btn {
					position: absolute;
					right: 24upx;
					top: 24upx;
					width: 160upx;
					height: 40upx;
					text-align: center;
					line-height: 40upx;
					font-size: 22upx;
					color: #36343c;
					border-radius: 20px;
					background: linear-gradient(to left, #f9e6af, #ffd465);
					z-index: 1;
				}

				.tit {
					font-size: $font-base + 2upx;
					color: #f7d680;
					margin-bottom: 28upx;

					.iconfont {
						color: #f6e5a3;
						display: inline-block;
						margin-right: 16upx;
					}
				}
			}
		}

		.cover-container {
			margin-top: -150upx;
			padding: 0 30upx 20upx;
			position: relative;
			background-color: $page-color-base;

			.arc {
				position: absolute;
				left: 0;
				top: -34upx;
				width: 100%;
				height: 36upx;
			}

			.promotion-center {
				background: #fff;
				margin-bottom: 20upx;

				/*分类列表*/
				.category-list {
					width: 100%;
					padding: 0 0 30upx 0;
					border-bottom: solid 2upx #f6f6f6;
					display: flex;
					flex-wrap: wrap;

					.category {
						width: 33.3%;
						margin-top: 50upx;
						display: flex;
						justify-content: center;
						flex-wrap: wrap;

						.img {
							width: 100%;
							display: flex;
							justify-content: center;

							.iconfont {
								font-size: $font-lg + 24upx;
							}
						}

						.text {
							width: 100%;
							display: flex;
							justify-content: center;
							font-size: 24upx;
							color: #3c3c3c;
						}

						.share-btn {
							height: 142upx;
							text-align: left;
							background: none;
							padding: 0;
							margin: 0;
						}

						.share-btn:after {
							border: none;
							border-radius: none;
						}
					}
				}
			}

			.tj-sction {
				@extend %section;
				display: flex;

				.tj-item {
					@extend %flex-center;
					flex: 1;
					flex-direction: column;
					margin: 30upx 0;
					font-size: $font-sm;
					color: #75787d;
					/*border-right: 2upx solid rgba(0, 0, 0, 0.2);*/
				}

				/*.tj-item:last-child {*/
				/*border-right: none;*/
				/*}*/
				.num {
					font-size: $font-base;
				}

				.red {
					color: $base-color;
				}
			}

		}
	}

	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		justify-content: space-around;
		display: flex;
		align-content: center;
		background: #fff;
		border-radius: 10upx;
	}
</style>
