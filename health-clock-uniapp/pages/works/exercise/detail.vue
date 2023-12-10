<template>
	<view class="page">
		<view class="input-t">
			<text>运动名称</text>
			<text class="input-quick"></text>
		</view>
		<view class="input-body">
			<textarea placeholder="请输入运动名称..." v-model="sendDate.exerciseName" class="input-textare" />
		</view>

		<button class="confirm-btn" :class="'bg-' + themeColor.name" :disabled="btnLoading" :loading="btnLoading"
			@tap="nextStep">
			保存
		</button>
		<button class="confirm-btn" :class="'bg-' + themeColor.name" :disabled="btnLoading" :loading="btnLoading"
			@tap="nextStep2">
			删除
		</button>

	</view>
</template>

<script>
	import nativeUtil from "@/utils/native-nfc-util.js"
	import requests from '@/utils/requests.js'
	export default {
		data() {
			return {
				mtype: '',
				mtypeValue: '', // 选中下标
				worksType: [],
				worksTypeList: [],
				sendDate: {
					id: '',
					exerciseName: '',
				},
				place: {},
				imgLink: '', // 图片
				imageList: [],
				btnLoading: false,
				searchParameters: {
					pageNum: 1,
					pageSize: 100,
				},
				repairDetail: {}
			};
		},
		onLoad(e) {
			console.log(e)
			this.repairDetail = JSON.parse(e.item)
			this.sendDate.id = this.repairDetail.id
			this.sendDate.exerciseName = this.repairDetail.exerciseName

		},
		onShow() {
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: this.themeColor.color,
				animation: {
					duration: 400,
					timingFunc: 'easeIn'
				}
			})
		},

		methods: {
			// 删除
			nextStep2(){
				
				uni.showModal({
					title: '提示',
					content: '确认删除？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							requests.removeExercise(this.sendDate.id).then(res => {
								if (res && res.code === 200) {
									uni.showToast({
										title: res.msg,
										icon: 'success',
									})
									uni.navigateBack()
								}
							})
						}
					},
				})
				
			},
			// 发送数据
			async nextStep() {
				let that = this
				if (that.sendDate.exerciseName === '' || that.sendDate.exerciseName === null) {
					uni.showToast({
						title: '请输入运动名称',
						icon: 'none'
					})
					return
				}
				let obj = Object.assign({
					id: that.sendDate.id,
					exerciseName: that.sendDate.exerciseName,
				})

				console.log(obj)

				requests.editExercise(obj).then(res => {
					if (res && res.code === 200) {
						uni.showToast({
							title: res.msg,
							icon: 'success',
						})
						uni.navigateBack()
					}
				})
			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: $page-color-base;
	}

	.cu-form-group {
		border-style: none;
		background-color: $page-color-base;
		padding: $spacing-base;
		width: 100%;
		display: flex;
		align-items: center;
		// min-height: 100upx;
		justify-content: space-between;
	}

	/*表单标题*/
	.input-t {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: $spacing-base;
		margin-top: $spacing-base;
		font-size: $font-base;

	}

	.tit {
		width: 80%;
		font-size: $font-sm + 2upx;
		color: $font-color-base;
	}

	.input-quick {
		position: relative;
		padding-right: 40upx;

		.iconfont {
			font-size: $font-sm;
		}
	}

	.input-body {
		background: $color-white;
		padding: $spacing-sm $spacing-base;

		.gender-item {
			margin-right: 20upx;

			.gender-item-text {
				padding-left: 10upx;
			}

		}
	}

	.input-textare {
		height: 200upx;
		font-size: 34upx;
		line-height: 50upx;
		width: 100%;
		box-sizing: border-box;
		padding: 20upx 30upx 0;
	}

	.covers-title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: $spacing-base;
		margin-top: $spacing-base;
		font-size: $font-base;

	}

	.covers-body {
		background: $color-white;
		padding: $spacing-sm $spacing-base;

		.gender-item {
			margin-right: 20upx;

			.gender-item-text {
				padding-left: 10upx;
			}

			radio .wx-radio-input.wx-radio-input-checked {
				background: $uni-color-primary;
				border-color: $uni-color-primary;
			}
		}
	}

	.covers-uploader {
		padding: 22upx 20upx;
	}
</style>
