<template>
	<view class="page">
		<view class="input-t" @tap.stop="chooseType">
			<text>食物类型</text>
			<text class="input-quick">{{ mtype || '请选择食物类型' }} <text class="iconfont iconxia"></text></text>
		</view>
		<view class="input-t">
			<text>品牌名称</text>
			<text class="input-quick"></text>
		</view>
		<view class="input-body">
			<textarea placeholder="请输入品牌名称..." v-model="sendDate.brandName" class="input-textare" />
		</view>
		
		<view class="input-t">
			<text>食物名称</text>
			<text class="input-quick"></text>
		</view>
		<view class="input-body">
			<textarea placeholder="请输入食物名称..." v-model="sendDate.footName" class="input-textare" />
		</view>
		
		<view class="input-t">
			<text>热量（千卡）</text>
			<text class="input-quick"></text>
		</view>
		<view class="input-body">
			<textarea placeholder="请输入热量..." v-model="sendDate.heat" class="input-textare" />
		</view>
	
		<button class="confirm-btn" :class="'bg-' + themeColor.name" :disabled="btnLoading" :loading="btnLoading"
			@tap="nextStep">
			保存
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
					brandName: '', 
					footName: '',
					footType: '',
					heat:''
				},
				place: {},
				imgLink: '', // 图片
				imageList: [],
				btnLoading: false
			};
		},
		onLoad(e) {
			console.log(e)
			this.getDicts()
			
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
			getDicts(){
				let that = this
				that.worksType = []
				requests.getDicts('foot_type').then(res => {
					if (res && res.code === 200) {
						res.data.forEach((item) => {
							let obj = Object.assign({
								id: item.dictValue,
								name: item.dictLabel
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
								this.sendDate.footType = Number(item.id)
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
				if (that.sendDate.footType === '' || that.sendDate.footType === null) {
					uni.showToast({
						title: '请选择食物分类',
						icon: 'none'
					})
					return
				}
				if (that.sendDate.brandName === '' || that.sendDate.brandName === null) {
					uni.showToast({
						title: '请输入品牌名称',
						icon: 'none'
					})
					return
				}
				if (that.sendDate.footName === '' || that.sendDate.footName === null) {
					uni.showToast({
						title: '请输入食物名称',
						icon: 'none'
					})
					return
				}
				if (that.sendDate.heat === '' || that.sendDate.heat === null) {
					uni.showToast({
						title: '请输入热量',
						icon: 'none'
					})
					return
				}
				if (isNaN(that.sendDate.heat)) {
					uni.showToast({
						title: '热量输入有误!',
						icon: 'none'
					})
					return
				}
				let userInfo = uni.getStorageSync('userInfo');
				let obj = Object.assign({
					brandName: that.sendDate.brandName,
					footName: that.sendDate.footName,
					footType: that.sendDate.footType,
					heat: that.sendDate.heat,
					userId: userInfo.userId,
					userName: userInfo.userName,
				})
				
				console.log(obj)
				
				requests.addStock(obj).then(res => {
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
