<template>
	<view>
			<view class="container">
				<!--顶部返回按钮-->
				<text class="back-btn iconfont iconzuo" @tap="navBack"></text>
				<view class="right-top-sign"></view>
				<view class="wrapper">
					<view class="left-top-sign">GET BACK</view>
					<view class="welcome"> 修改密码！ </view>
					<view class="input-content">
						<!-- <view class="input-item">
							<text class="tit">用户名</text>
							<input
								type="number"
								placeholder="请输入用户名"
								v-model="form.userName"
							/>
						</view> -->
						<view class="input-item">
							<text class="tit">密码：</text>
							<input
								type="password"
								placeholder="请输入您的密码:"
								v-model="form.password"
							/>
						</view>
						<view class="input-item">
							<text class="tit">确认密码：</text>
							<input
								type="password"
								placeholder="请输入确认密码:"
								v-model="form.password2"
							/>
						</view>
					</view>
					<button
						class="confirm-btn"
						:class="'bg-' + themeColor.name"
						:disabled="btnLoading" :loading="btnLoading"
						@click="toUpdatePassword"
					>
						修改密码
					</button>
				</view>
				
			</view>
		
	</view>
</template>

<script>
	import requests from '@/utils/requests.js';
export default {
	data() {
		return {
			form:{
				userId: '',
				userName: '',
				password:'',
				password2:''
			},
			btnLoading: false
			
		};
	},
	
	onLoad(options) {
		this.form.userId = uni.getStorageSync('userInfo').userId
		
	},
	methods: {
		toUpdatePassword(){
			let that = this;
			if (this.form.password === '' || this.form.password === null) {
				uni.showToast({
					title: '请输入密码：',
					icon: 'none'
				})
				return
			}
			
			if (this.form.password2 === '' || this.form.password2 === null) {
				uni.showToast({
					title: '请输入确认密码：',
					icon: 'none'
				})
				return
			}
			
			if (this.form.password !== this.form.password2) {
				uni.showToast({
					title: '两次密码输入不一致!',
					icon: 'none'
				})
				return
			}
			requests.resetPwdMini(that.form).then(res => {
				if(res && res.code === 200){
					uni.showToast({
						title: res.msg,
						icon: 'success',
					})
					uni.removeStorageSync('token')
					uni.removeStorageSync('userInfo')
					requests.logout()
					uni.reLaunch({
						url: './login'
					})
				}
			})
		},
		
		navBack() {
			this.$mRouter.back();
		},
		navTo(route) {
			this.$mRouter.push({ route });
		},
		toHome() {
			this.$mRouter.reLaunch({ route: '/pages/index/index' });
		},
		
	}
};
</script>

<style lang="scss">
page {
	background: $color-white;
}
.container {
	padding-top: 60px;
	position: relative;
	width: 100vw;
	overflow: hidden;
	.wrapper {
		position: relative;
		width: 100vw;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;

		.welcome {
			position: relative;
			left: 50upx;
			top: -90upx;
			font-size: 46upx;
			color: #555;
			text-shadow: 1px 0px 1px rgba(0, 0, 0, 0.3);
		}

		.input-content {
			padding: 0 60upx;
		}

		.input-item {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			padding: 0 30upx;
			background: $page-color-light;
			height: 120upx;
			border-radius: 4px;
			margin-bottom: 50upx;

			&:last-child {
				margin-bottom: 0;
			}

			.tit {
				height: 50upx;
				line-height: 56upx;
				font-size: $font-sm + 2upx;
				color: $font-color-base;
			}

			input {
				height: 60upx;
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				width: 100%;
			}
		}

		.input-item-sms-code {
			position: relative;

			.sms-code-btn {
				position: absolute;
				right: 20upx;
				color: #111;
				bottom: 20upx;
				font-size: 28upx;
			}

			.sms-code-resend {
				color: #999;
			}
		}

		.forget-section {
			font-size: $font-sm + 2upx;
			color: $font-color-spec;
			text-align: center;
			margin-top: 40upx;
		}
	}

	.back-btn {
		position: absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}

	.left-top-sign {
		font-size: 120upx;
		color: $page-color-base;
		position: relative;
		left: -16upx;
	}

	.right-top-sign {
		position: absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;

		&:before,
		&:after {
			display: block;
			content: '';
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}

		&:before {
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}

		&:after {
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}

	.register-section {
		margin: 50upx 0 50upx 0;
		width: 100%;
		font-size: $font-sm + 2upx;
		color: $font-color-base;
		text-align: center;

		text {
			color: $font-color-spec;
			margin-left: 10upx;
			margin-right: 10upx;
		}
	}
}
.password-type-2 {
	width: 100%;
	position: relative;
	.back-btn {
		position: absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 48upx;
		color: $color-white;
	}
	.login-top {
		height: 460upx;
		position: relative;
		.desc {
			position: absolute;
			top: 200upx;
			left: 40upx;
			font-size: 48upx;
			.title {
				font-size: 48upx;
			}
		}
		.login-pic {
			position: absolute;
			width: 220upx;
			height: 270upx;
			right: 30upx;
			top: 100upx;
		}
	}
	.login-type-content {
		position: relative;
		top: -72upx;
		.login-bg {
			width: 94vw;
			height: 114vw;
			margin: 0 3vw;
		}
		.main {
			width: 94vw;
			position: absolute;
			top: 0;
			left: 3vw;
			.nav-bar {
				display: flex;
				height: 100upx;
				justify-content: center;
				align-items: center;
				position: relative;
				z-index: 10;
				.nav-bar-item {
					flex: 1;
					display: flex;
					height: 100%;
					line-height: 96upx;
					font-size: $font-lg;
					display: flex;
					margin: 0 120upx;
					justify-content: center;
				}
				.nav-bar-item-active {
					border-bottom: 5upx solid;
				}
			}
			.login-type-form {
				width: 80%;
				margin: 50upx auto;
				.input-item {
					position: relative;
					height: 90upx;
					line-height: 90upx;
					margin-bottom: $spacing-lg;
					.iconfont {
						font-size: 50upx;
						position: absolute;
						left: 0;
					}
					.login-type-input {
						height: 90upx;
						padding-left: 80upx;
						border-bottom: 1upx solid rgba(0, 0, 0, .1);
					}
					.sms-code-btn, sms-code-resend {
						width: 240upx;
						font-size: $font-base - 2upx;
					}
				}
			}
			.login-type-tips {
				padding: 0 50upx;
				display: flex;
				justify-content: space-between;
			}
			.confirm-btn {
				height: 80upx;
				line-height: 80upx;
			}
		}
	}
	.login-type-bottom {
		width: 100%;
		padding-bottom: 30upx;
		text-align: center;
		font-size: $font-lg;
	}
}
</style>
