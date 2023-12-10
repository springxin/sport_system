<template>
	<view class="page">
		<view class="input-t" @tap.stop="chooseType">
			<text>运动类型</text>
			<text class="input-quick">{{ mtype || '请选择运动类型' }} <text class="iconfont iconxia"></text></text>
		</view>
		<view class="input-t">
			<text>食物</text>
			<text class="input-quick"></text>
		</view>
		<view class="input-body">
			<textarea placeholder="请输入食物..." v-model="sendDate.eatFoot" class="input-textare" />
		</view>
		<view class="input-t">
			<text>摄入卡路里（千焦）</text>
			<text class="input-quick"></text>
		</view>
		<view class="input-body">
			<textarea placeholder="请输入摄入卡路里..." v-model="sendDate.intakeCalorie" class="input-textare" />
		</view>
		
		<view class="input-t">
			<text>消耗卡路里（千焦）</text>
			<text class="input-quick"></text>
		</view>
		<view class="input-body">
			<textarea placeholder="请输入消耗卡路里..." v-model="sendDate.consumeCalorie" class="input-textare" />
		</view>
	
		<button class="confirm-btn" :class="'bg-' + themeColor.name" :disabled="btnLoading" :loading="btnLoading"
			@tap="nextStep">
			打卡
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
					exerciseType: '',
					eatFoot: '',
					intakeCalorie: '', 
					consumeCalorie: '',
				},
				place: {},
				imgLink: '', // 图片
				imageList: [],
				btnLoading: false,
				searchParameters: {
					pageNum: 1,
					pageSize: 100,
				},
			};
		},
		onLoad(e) {
			console.log(e)
			this.getList()
			
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
			
			getList(){
				let that = this
				that.worksType = []
				requests.getExercise(this.searchParameters).then(res => {
					if (res && res.code === 200) {
						res.rows.forEach((item) => {
							let obj = Object.assign({
								id: item.id,
								name: item.exerciseName
							})
							that.worksTypeList.push(obj)
						})
						that.worksTypeList.forEach((item) => {
							that.worksType.push(item.name)
						})
					}
				
				})
			},
			chooseType() {
				uni.showActionSheet({
					itemList: this.worksType,
					success: res => {
						console.log('res===>', res)
						this.mtype = this.worksType[res.tapIndex];
						this.mtypeValue = res.tapIndex;
						this.worksTypeList.forEach((item, index) => {
							if (res.tapIndex === index) {
								this.sendDate.exerciseType = Number(item.id)
							}
						})
					},
					fail: res => {
						console.log(res);
					}
				});
			},
			// 发送数据
			async nextStep() {
				let that = this
				if (that.sendDate.exerciseType === '' || that.sendDate.exerciseType === null) {
					uni.showToast({
						title: '请选择运动类型',
						icon: 'none'
					})
					return
				}
				if (that.sendDate.eatFoot === '' || that.sendDate.eatFoot === null) {
					uni.showToast({
						title: '请输入食物',
						icon: 'none'
					})
					return
				}
				if (that.sendDate.intakeCalorie === '' || that.sendDate.intakeCalorie === null) {
					uni.showToast({
						title: '请输入摄入卡路里',
						icon: 'none'
					})
					return
				}
				if (isNaN(that.sendDate.intakeCalorie)) {
					uni.showToast({
						title: '摄入卡路里输入有误!',
						icon: 'none'
					})
					return
				}
				if (that.sendDate.consumeCalorie === '' || that.sendDate.consumeCalorie === null) {
					uni.showToast({
						title: '请输入消耗卡路里',
						icon: 'none'
					})
					return
				}
				if (isNaN(that.sendDate.consumeCalorie)) {
					uni.showToast({
						title: '消耗卡路里输入有误!',
						icon: 'none'
					})
					return
				}
				let userInfo = uni.getStorageSync('userInfo');
				let obj = Object.assign({
					exerciseType: that.sendDate.exerciseType,
					eatFoot: that.sendDate.eatFoot,
					intakeCalorie: that.sendDate.intakeCalorie,
					consumeCalorie: that.sendDate.consumeCalorie,
					userId: userInfo.userId,
					userName: userInfo.userName,
				})
				
				console.log(obj)
				
				requests.addClock(obj).then(res => {
					if(res && res.code === 200){
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
