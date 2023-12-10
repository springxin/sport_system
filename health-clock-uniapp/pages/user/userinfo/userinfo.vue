<template>
	<view class="userinfo">
		<!--头像 + 背景-->
		<view class="user-section" :class="'bg-' + themeColor.name">
			<view class="portrait-box">
				<image class="portrait" :src="profileInfo.avatar"></image>
			</view>
		</view>
		<view class="input-content">

			<view class="input-item">
				<text class="tit">手机号:</text>
				<input type="number" v-model="profileInfo.phonenumber" maxlength="11" placeholder="请输入手机号码" />
			</view>
			<view class="input-item">
				<text class="tit">姓 名:</text>
				<input type="text" v-model="profileInfo.userName" placeholder="请输入您的姓名" />
			</view>
			<view class="input-item">
				<text class="tit">性　别:</text>
				<radio-group @change="handleGenderChange">
					<label class="gender-item" v-for="(item, index) in genders" :key="index">
						<radio class="gender-item-radio" :color="themeColor.color" :value="item.value"
							:checked="item.value === profileInfo.sex" />
						<text class="gender-item-text">{{ item.name }}</text>
					</label>
				</radio-group>
			</view>
			<view class="input-item">
				<text class="tit">邮　箱:</text>
				<input v-model="profileInfo.email" placeholder="请输入您的邮箱" />
			</view>
			<button class="confirm-btn" :class="'bg-' + themeColor.name" :disabled="btnLoading" :loading="btnLoading"
				@tap="toUpdateInfo">
				修改资料
			</button>
		</view>

	</view>
</template>

<script>
	import avatar from '@/components/oa-avatar/oa-avatar';
	import moment from '@/common/moment';
	import rfPickRegions from '@/components/oa-pick-regions';
	import requests from '@/utils/requests.js';
	export default {
		components: {
			avatar,
			rfPickRegions
		},
		data() {
			return {
				// 年级
				mtype: '',
				mtypeValue: '', // 选中下标
				worksType: [],
				worksTypeList: [],
				// 班级
				mtype2: '',
				mtypeValue2: '', // 选中下标
				worksType2: [],
				worksTypeList2: [],
				// 身份
				mtype3: '',
				mtypeValue3: '', // 选中下标
				worksType3: [],
				worksTypeList3: [],
				// 专业
				mtype4: '',
				mtypeValue4: '', // 选中下标
				worksType4: [],
				worksTypeList4: [],
				profileInfo: {},
				genders: [{
						value: '2',
						name: '未知'
					},
					{
						value: '0',
						name: '男'
					},
					{
						value: '1',
						name: '女'
					}
				],
				date: moment().format('YYYY-MM-DD'),
				token: null,
				loading: true,
				headImg: this.$mAssetsPath.headImg,
				userBg: this.$mAssetsPath.userBg,
				btnLoading: false,
				searchParameters: {
					pageNum: 1,
					pageSize: 100,
				},
			};
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
		onLoad() {
			// this.initData();
			this.profileInfo = uni.getStorageSync('userInfo')
		},
		methods: {
			// 获取选择的地区
			handleGetRegions(e) {
				this.addressData.province_id = e.province_id;
				this.addressData.city_id = e.city_id;
				this.addressData.area_id = e.area_id;
			},

			// 上传头像
			uploadImage() {
				// 从相册选择图片
				const _this = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: function(res) {
						_this.handleUploadFile(res.tempFilePaths);
					}
				});
			},
			// 上传头像
			handleUploadFile(data) {
				this.$mHelper.toast('头像上传中...');
			},
			// 监听日期更改
			bindDateChange(e) {
				this.date = e.target.value;
			},
			// 监听性别更改
			handleGenderChange(e) {
				this.profileInfo.sex = e.detail.value;
			},

			// 更新用户信息
			async toUpdateInfo() {
				let that = this;
				console.log('profileInfo===>', this.profileInfo)
				if (this.profileInfo.phonenumber === '' || this.profileInfo.phonenumber === null) {
					uni.showToast({
						title: '请输入手机号码',
						icon: 'none'
					})
					return
				}

				var reg = /^1[3456789]\d{9}$/;
				if (!reg.test(this.profileInfo.phonenumber)) {
					uni.showToast({
						title: '请输入正确的手机号码',
						icon: 'none'
					})
					return
				}
				if (this.profileInfo.userName === '' || this.profileInfo.userName === null) {
					uni.showToast({
						title: '请输入姓名',
						icon: 'none'
					})
					return
				}

				if (this.profileInfo.sex === '' || this.profileInfo.sex === null) {
					uni.showToast({
						title: '请选择性别',
						icon: 'none'
					})
					return
				}
				
				if (this.profileInfo.gradeId === '' || this.profileInfo.gradeId === null) {
					uni.showToast({
						title: '请选择年级',
						icon: 'none'
					})
					return
				}
				
				if (this.profileInfo.classId === '' || this.profileInfo.classId === null) {
					uni.showToast({
						title: '请选择班级',
						icon: 'none'
					})
					return
				}
				
				if (this.profileInfo.identityId === '' || this.profileInfo.identityId === null) {
					uni.showToast({
						title: '请选择身份',
						icon: 'none'
					})
					return
				}

				if (this.profileInfo.email === '' || this.profileInfo.email === null) {
					uni.showToast({
						title: '请输入邮箱',
						icon: 'none'
					})
					return
				}

				requests.editUserInfo(that.profileInfo).then(res => {
					if (res && res.code === 200) {
						uni.showToast({
							title: res.msg,
							icon: 'success',
						})
						requests.getUserByUserName(that.profileInfo.userName).then(res1 => {
							if (res1 && res1.code === 200) {
								let userInfo = res1.userInfo
								uni.setStorageSync('userInfo', userInfo)
							}
						})
					}
				})
			},

		}
	};
</script>

<style lang="scss" scoped>
	page {
		background-color: $color-white;
	}

	.userinfo {
		.user-section {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 320upx;
			padding: 40upx 30upx 0;
			overflow: hidden;
			position: relative;

			.bg {
				position: absolute;
				left: 0;
				top: 0;
				width: 100vw;
				opacity: 0.84;
			}

			.portrait-box {
				clear: both;
				z-index: 2;
			}

			.portrait {
				position: relative;
				width: 200upx;
				height: 200upx;
				border-radius: 50%;
				border: 6upx solid #fff;
			}

			.yticon {
				position: absolute;
				line-height: 1;
				z-index: 5;
				font-size: 48upx;
				color: #fff;
				padding: 4upx 6upx;
				border-radius: 6upx;
				background: rgba(0, 0, 0, 0.4);
			}

			.pt-upload-btn {
				right: 0;
				bottom: 10upx;
			}

			.bg-upload-btn {
				right: 20upx;
				bottom: 16upx;
			}
		}

		.input-content {
			padding: 40upx 60upx;

			.input-item {
				display: flex;
				padding: 0 30upx;
				background: $page-color-light;
				height: 80upx;
				line-height: 80upx;
				border-radius: 4px;
				margin-bottom: 30upx;

				&:last-child {
					margin-bottom: 0;
				}

				.tit {
					width: 100upx;
					font-size: $font-sm + 2upx;
					color: $font-color-base;
				}

				input {
					width: calc(100% - 100upx);
					height: 80upx;
					line-height: 80upx;
					font-size: $font-base + 2upx;
					color: $font-color-dark;
				}

				.date {
					height: 80upx;
					line-height: 80upx;
					font-size: $font-base + 2upx;
					color: $font-color-dark;
				}

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
		}
	}
</style>
