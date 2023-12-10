<template>
	<view class="page">
		<view class="input-t" @tap.stop="chooseType">
			<text>审核类型</text>
			<text class="input-quick">{{ mtype || '请选择审核类型' }} <text class="iconfont iconxia"></text></text>
		</view>

		<view class="input-t" v-if="isRejectCause">
			<text>驳回原因</text>
			<text class="input-quick"></text>
		</view>
		<view class="input-body" v-if="isRejectCause">
			<textarea placeholder="请输入驳回原因..." v-model="form.rejectCause" class="input-textare" />
		</view>

		<button class="confirm-btn" :class="'bg-' + themeColor.name" :disabled="btnLoading" :loading="btnLoading"
			@tap="send">
			提交
		</button>

	</view>
</template>

<script>
	import moment from '@/common/moment';
	import requests from '@/utils/requests.js'
	export default {
		data() {
			return {
				date: '',
				type: '',
				mtype: '',
				mtypeValue: '', // 选中下标
				sendDate: {
					remind: '0',
					content: ''
				},
				form: {
					id: '',
					status: '',
					rejectCause: '',
				},
				worksType: ['通过','驳回'],
				isRejectCause: false,
				btnLoading: false
			};
		},
		onLoad(e) {
			this.form.id = e.id
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
			// 监听反馈类型事件
			handleRemindTypeChange(e) {
				this.sendDate.remind = e.detail.value;
			},
			chooseType() {
				uni.showActionSheet({
					itemList: this.worksType,
					success: res => {
						this.mtype = this.worksType[res.tapIndex];
						this.mtypeValue = res.tapIndex;
						if(this.mtypeValue === 0){
							console.log(0)
							this.isRejectCause = false
							this.form.status = 1
						}else if(this.mtypeValue === 1){
							console.log(1)
							this.isRejectCause = true
							this.form.status = 2
						}
					},
					fail: res => {
						console.log(res);
					}
				});
			},
			// 发送数据
			async send() {
				let that = this;
				console.log('form===>', this.form)
				if (this.mtype === '' || this.mtype === null) {
					uni.showToast({
						title: '请选择审核类型',
						icon: 'none'
					})
					return
				}
				if(this.mtypeValue === 1){
					if (this.form.rejectCause === '' || this.form.rejectCause === null) {
						uni.showToast({
							title: '请输入驳回原因',
							icon: 'none'
						})
						return
					}
				}
				

				this.btnLoading = true
				setTimeout(() => {
					that.btnLoading = false
				}, 3000)
				
				requests.editDocument(this.form).then(res => {
					if (res && res.code === 200) {
						uni.showToast({
							title: res.msg,
							icon: 'success',
						})
						uni.navigateBack({
							delta: 2
						})
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

	.date {
		height: 80upx;
		line-height: 80upx;
		font-size: $font-base + 2upx;
		color: $font-color-dark;
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
</style>
