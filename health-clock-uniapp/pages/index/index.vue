<template>
	<view class="notify">
		<view class="promotion-center">
			<view class="tj-sction">
				<!-- 轮播图1 -->
				<view class="swiper">
					<view class="swiper-box">
						<oa-swipe-dot :info="advList" mode="nav" :current="current" field="adv_title">
							<swiper @change="handleDotChange" autoplay="true" :indicator-dots="true" 
							:circular="true" :autoplay="true" interval="3000" duration="300">
								<swiper-item v-for="(item, index) in advList" :key="index">
									<view class="swiper-item">
										<image :src="item.cover" mode="aspectFill" />
									</view>
								</swiper-item>
							</swiper>
						</oa-swipe-dot>
					</view>
				</view>
			</view>
		</view>

	</view>

</template>
<script>
	import moment from '@/common/moment';
	import listCell from '@/components/oa-list-cell';
	import {
		mapMutations
	} from 'vuex';
	import oaSwipeDot from '@/components/oa-swipe-dot';
	import rfSwiperSlide from '@/components/oa-swiper-slide';
	import oaEmpty from '@/components/oa-empty';
	import requests from '@/utils/requests.js'
	export default {
		components: {
			listCell,
			oaSwipeDot,
			rfSwiperSlide,
			oaEmpty
		},
		data() {
			return {
				isEmpty: false,
				noticeList: [],
				guessYouLikeList: [],
				current: 0, // 轮播图index
				advList: [{
					"id": "4",
					"adv_title": "快乐生活每一天",
					"cover": "../../static/sport_1.jpg"
				},
				{
					"id": "5",
					"adv_title": "健康吃喝一整年",
					"cover": "../../static/sport_5.jpg"
				},
				{
					"id": "6",
					"adv_title": "魔法变变变",
					"cover": "../../static/sport_6.jpg"
				},
				{
					"id": "7",
					"adv_title": "肥肉减减减",
					"cover": "../../static/sport_7.jpg"
				},
				], // 
				searchParameters: {
					pageNum: 1,
					pageSize: 50,
				},
			};
		},
		filters: {
			notifyTypeFilter(val) {
				console.log('--------------->',val)
				return '公告';
			}
		},
		onLoad() {
			
			if(!uni.getStorageSync('userInfo')){
				uni.reLaunch({
					url: '../public/login'
				})
			}
		},
		onShow() {
			this.initData();
		},
		//下拉刷新
		onPullDownRefresh: function() {
			this.getNoticeList()
			//模拟加载完成
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 2000);
		},
		computed: {
			bottom() {
				let bottom = 0;
				/*  #ifdef H5  */
				bottom = 90;
				/*  #endif */
				return bottom;
			}
		},
		methods: {
			
			send(){
				let filePath = `${wx.env.USER_DATA_PATH}/${+ new Date().getTime()}.docx`
				uni.request({
					url: 'http://localhost:9314/mini/export',
					data: {dTitle: '11111',dContent: '22222'},
					responseType: "arraybuffer",
					success: (res1) => {
						console.log(res1)
						let fm = uni.getFileSystemManager()
						fm.writeFile({
							filePath,
							data: res1.data,
							success: (res) => {
								console.log(res)
								uni.openDocument({
									filePath,
									fail: (e) => {
										console.log(e)
										uni.showToast({
											title: '文件打开失败',
											icon: 'none'
										})
									}
								})
							},
							fail: () => {
								uni.showToast({
									title: '文件保存失败',
									icon: 'none'
								})
							}
						})
					},
					fail: () => {
						uni.showToast({
							title: '文件导出失败',
							icon: 'none'
						})
					}
				})
			},
			// 监听轮播图切换
			handleDotChange(e) {
				this.current = e.detail.current;
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
			},

			// 通用跳转
			async navTo(item) {
				uni.navigateTo({
					url: '../notice/detail?item=' + JSON.stringify(item)
				})
			},

		}
	};
</script>
<style lang="scss">
	page {
		background-color: $page-color-base;
	}

	/*轮播图*/
	.swiper {
		width: 100%;
		margin-top: 20upx;
		margin-bottom: 20upx;
		display: flex;
		justify-content: center;

		.swiper-box {
			width: 92%;
			height: 40vw;
			overflow: hidden;
			border-radius: 15upx;
			box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2);
			//兼容ios，微信小程序
			position: relative;
			z-index: 1;

			swiper {
				width: 100%;
				height: 40vw;

				swiper-item {
					image {
						width: 100%;
						height: 40vw;
					}
				}
			}
		}
	}

	.notify {

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

		.header {
			width: 100%;
			padding-left: $font-lg;
			height: 100upx;
			display: flex;
			align-items: center;
			position: fixed;
			top: 0;
			z-index: 10;
			background-color: #fff;
			/*  #ifdef  APP-PLUS  */
			top: var(--status-bar-height);

			/*  #endif  */
			.title {
				font-size: 36upx;
			}
		}

		.place {
			background-color: #ffffff;
			height: 100upx;
			/*  #ifdef  APP-PLUS  */
			margin-top: var(--status-bar-height);
			/*  #endif  */
		}

		.notify-list {
			.read {
				text-align: right;
				margin-right: $spacing-base;
				margin-top: $spacing-base;
				margin-bottom: $spacing-sm;

				text {
					margin-left: $spacing-base;
				}
			}

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

				.menu {
					.iconfont {
						color: #fff;
						font-size: 60upx;
					}

					position: absolute;
					width: 29%;
					height: 100%;
					right: 0;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #fff;
					z-index: 2;
				}

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

					&.open {
						animation: showMenu 0.25s linear both;
					}

					&.close {
						animation: closeMenu 0.15s linear both;
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

			.notify-wrapper {
				background-color: $color-white;
				width: 100%;
				padding: $spacing-base $spacing-lg $spacing-base 80upx;
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

				.type {
					position: absolute;
					top: 26upx;
					left: -10upx;
					border: none;
					font-size: $font-sm;
					opacity: 0.8;
				}

				.un-read {
					display: inline-block;
					width: 12upx;
					height: 12upx;
					border-radius: 50%;
					position: absolute;
					top: 32upx;
					right: 30upx;
				}
			}
		}

		.notify-empty {
			position: fixed;
			left: 0;
			top: 50;
			width: 100%;
			height: 100vh;
			padding-bottom: 100upx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			background: #fff;

			.iconfont {
				font-size: $font-lg + 100upx;
			}

			.empty-tips {
				display: flex;
				font-size: $font-sm + 2upx;
				color: $font-color-disabled;

				.navigator {
					margin-left: 16upx;
				}
			}
		}
	}
</style>
