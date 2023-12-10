import Vue from 'vue';
import App from './App';
// 引入全局存储
import store from '@/store';
// 引入全局配置
import $mAssetsPath from '@/config/assets.config.js';
import $mConfig from '@/config/index.config.js';
import $mRoutesConfig from '@/config/routes.config.js';
import $mFormRule from '@/config/formRule.config.js';
import $mConstDataConfig from '@/config/constData.config.js';
// import $mWebsocketConfig from '@/config/websocket.config.js';
import $mSettingConfig from '@/config/setting.config.js';
// 引入全局方法
import { http } from '@/utils/request';
import $mGraceChecker from '@/utils/graceChecker';
import $mHelper from '@/utils/helper';
import $mRouter from '@/utils/router';
// import $mWebsocket from '@/utils/websocket';
// 全局组件
import rfImage from '@/components/oa-image/oa-image';
import rfEmpty from '@/components/oa-empty';
import rfLoading from '@/components/oa-loading';
import rfLoadProgress from '@/components/oa-load-progress/oa-load-progress';
import rfParser from '@/components/oa-parser';
import rfBackTop from '@/components/oa-back-top';
import rfTag from '@/components/oa-tag';
import rfNavDetail from '@/components/oa-nav-detail';
import cuCustom from '@/components/cu-custom';

import requests from './utils/requests.js'  //引入异步请求函数
Vue.prototype.requests = requests.requests //挂载到全局
// 网络状态监听
uni.getNetworkType({
	success: res => {
		store.dispatch('networkStateChange', res.networkType);
	}
});
uni.onNetworkStatusChange(function (res) {
	store.dispatch('networkStateChange', res.networkType);
});
// 挂载全局自定义方法
Vue.prototype.$mStore = store;

Vue.prototype.$http = http;
Vue.prototype.$mConfig = $mConfig;
Vue.prototype.$mAssetsPath = $mAssetsPath;
Vue.prototype.$mFormRule = $mFormRule;
Vue.prototype.$mRoutesConfig = $mRoutesConfig;
Vue.prototype.$mConstDataConfig = $mConstDataConfig;
Vue.prototype.$mSettingConfig = $mSettingConfig;

Vue.prototype.$mGraceChecker = $mGraceChecker;
Vue.prototype.$mHelper = $mHelper;
Vue.prototype.$mRouter = $mRouter;

Vue.component('rfImage', rfImage);
Vue.component('rfEmpty', rfEmpty);
Vue.component('rfLoading', rfLoading);
Vue.component('rfLoadProgress', rfLoadProgress);
Vue.component('rfParser', rfParser);
Vue.component('rfBackTop', rfBackTop);
Vue.component('rfTag', rfTag);
Vue.component('rfNavDetail', rfNavDetail);
Vue.component('cuCustom', cuCustom);

if (process.env.NODE_ENV === 'production') {
	Vue.config.productionTip = false;
}

App.mpType = 'app';

Vue.mixin({
	computed: {
		themeColor: {
			get () {
				return store.getters.themeColor;
			},
			set (val) {
				store.state.themeColor = val;
			}
		}
	}
});

Vue.prototype.moneySymbol = $mConstDataConfig.moneySymbol;
Vue.prototype.singleSkuText = $mConstDataConfig.singleSkuText;

// 保留小数点后两位
Vue.filter('keepTwoDecimal', value => {
  return (Math.floor((value || 0) * 100) / 100).toFixed(2);
});

const app = new Vue({
	...App,
	store: store
});
app.$mount();


let baseUrl = "http://localhost:9314"
Vue.prototype.url = {
	login: baseUrl + "/login", // 登录
	logout: baseUrl + "/logout", // 退出登录
	getEmailCode: baseUrl + "/getEmailCode", // 登录
	getNoticeList : baseUrl + '/system/notice/list', // 查询公告列表
	editUserInfo: baseUrl + '/system/user/editUserInfo', // 修改用户
	getUserByUserName: baseUrl + "/system/user/getUserByUserName", // 通过用户名查询用户
	resetPwdMini: baseUrl + "/system/user/resetPwdMini", // 修改密码
	
}

Vue.prototype.ajax = function(url, method, data, fun) {
	uni.request({
		"url": url,
		"method": method,
		"header": {
			'Authorization': 'Bearer ' + uni.getStorageSync('token')
		},
		"data": data,
		success: function(resp) {
			if (resp.statusCode === 200 && resp.data.code === 401) {
				uni.showModal({
					title: '提示',
					content: '登录状态已过期，请您重新登录!',
					cancelText: '取消',
					confirmText: '重新登录',
					success: res => {
						if (res.confirm) {
							try {
								uni.removeStorageSync('token')
								uni.removeStorageSync('userInfo')
							} catch (e) {
								// error
								console.log(e)
							}
							uni.reLaunch({
								url: '/pages/public/login'
							})
						}else{
							uni.reLaunch({
								url: '/pages/index/index.vue'
							})
						}
					}
				})
			} else if (resp.statusCode === 200 && resp.data.code === 200) {
				let data = resp.data
				if (data.hasOwnProperty("token")) {
					let token = data.token
					uni.setStorageSync("token", token)
				}
				fun(resp)
			}else if(resp.data.status === 403){
				uni.showToast({
					icon: 'none',
					title: '服务器繁忙，请稍后再试^_^'
				});
			} else {
				uni.showToast({
					icon: 'none',
					title: resp.data.msg
				});
			}
		}
	});
}