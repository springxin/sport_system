/**
 * 封装的异步请求处理函数
 * 使用方法为:
 * request('接口名称',{key:value},'请求方式(默认为GET)')
 * .then(res=>{console.log(res)})
 */
let baseUrl = 'http://172.20.10.5:9314';
async function request(mehtod, params, type, showLoading) {
	//创建一个名为request请求的方法函数
	if (!type) {
		type = 'GET';
	}
	let url = baseUrl + mehtod
	return new Promise((resolve, reject) => {
		if (showLoading) {
			uni.showLoading({
				title: '加载中'
			});
		}

		uni.request({
			"method": type,
			"url": url,
			"header": {
				'Authorization': 'Bearer ' + uni.getStorageSync('token'),
				'client-type': 'MA', //客户端类型小程序
			},
			"data": params,
			success(res) {
				if (res.statusCode == 200) {
					if (res.data.code === 401) {
						uni.hideTabBarRedDot({
							index: 1
						})
						let pages = getCurrentPages(); // 获取页面栈
						var currentPage = pages[pages.length - 1].route; // 当前页面
						console.log('currentPage===>',currentPage)
						uni.setStorageSync('currentPage',currentPage)
						uni.showModal({
							title: '提示',
							content: '登录状态已过期',
							cancelText: '取消',
							confirmText: '重新登录',
							success: res => {
								if (res.confirm) {
									uni.reLaunch({
										url: '/pages/public/login'
									})
								}
								try {
									uni.removeStorageSync('token')
									uni.removeStorageSync('userInfo')
								} catch (e) {
									// error
									console.log(e)
								}
							},
						})
						reject("登录状态已过期，请您重新登录!");
					} else if (res.data.code === 200) {
						let data = res.data
						if (data.hasOwnProperty("token")) {
							let token = data.token
							uni.setStorageSync("token", data.token)
							uni.setStorageSync("userInfo", data.userInfo)
							uni.setStorageSync("cartLength", data.cartLength)
						}
						resolve(res.data);
					} else if (res.statusCode == 404) {
						uni.showModal({
							title: '提示',
							content: '接口请求出错，请检查手机网络',
							success(res) {}
						});
						reject();
					}else {
						console.log(res);
						uni.showModal({
							title: '提示',
							content: '错误：' + res.data.msg,
							success(res) {}
						});
						reject();
					}
				}
			},
			fail(error) {
				console.log(error);
				uni.showModal({
					title: '提示',
					content: '接口请求出错：' + error.errMsg,
					success(res) {}
				});
				reject(error);
			},
			complete(res) {
				uni.hideLoading();
			}
		});
	}).catch(e => {});
}
export default {
	request,
	login: data => {
		// 登录
		return request('/login', data, 'Post', true);
	},
	register: data => {
		// 注册
		return request('/register', data, 'Post', true);
	},
	
	logout: data => {
		// 退出登录
		return request('/logout', data, 'Post', true);
	},
	resetPwdMini: data => {
		// 修改密码
		return request('/system/user/resetPwdMini', data, 'Put', true);
	},
	editUserInfo: data => {
		// 修改用户
		return request('/system/user/editUserInfo', data, 'Put', true);
	},
	getUserByUserName: userName => {
		// 通过用户名查询用户
		return request('/system/user/getUserByUserName/' + userName, 'Get', true);
	},
	getBaseUrl: data => {
		// 图片上传地址
		return baseUrl+'/system/file/upload';
	},
	getDicts: dictType => {
		// 根据字典类型查询字典数据信息
		return request('/system/dict/data/type/' + dictType, 'Get', true);
	},
	getClock: data => {
		// 查询打卡记录信息列表
		return request('/system/clock/mini/list',data, 'Get', true);
	},
	addClock: data => {
		// 新增打卡记录信息
		return request('/system/clock/mini',data, 'Post', true);
	},
	editClock: data => {
		// 修改打卡记录信息
		return request('/system/clock/mini',data, 'Put', true);
	},
	removeClock: id => {
		// 删除打卡记录信息
		return request('/system/clock/mini/remove/'+ id, 'Get', true);
	},
	getStock: data => {
		// 查询食物库信息列表
		return request('/system/stock/mini/list',data, 'Get', true);
	},
	addStock: data => {
		// 新增食物库信息
		return request('/system/stock/mini',data, 'Post', true);
	},
	editStock: data => {
		// 修改食物库信息
		return request('/system/stock/mini',data, 'Put', true);
	},
	removeStock: id => {
		// 删除食物库信息
		return request('/system/stock/mini/remove/'+ id, 'Get', true);
	},
	getStatisticsVosList: data => {
		// 统计打卡记录信息
		return request('/system/clock/mini/selectPPunchClockStatisticsList',data, 'Get', true);
	},
	getExercise: data => {
		// 查询运动库信息列表
		return request('/system/exercise/mini/list',data, 'Get', true);
	},
	getExercise: data => {
		// 查询运动库信息列表
		return request('/system/exercise/mini/list',data, 'Get', true);
	},
	addExercise: data => {
		// 新增运动库信息
		return request('/system/exercise/mini',data, 'Post', true);
	},
	editExercise: data => {
		// 修改运动库信息
		return request('/system/exercise/mini',data, 'Put', true);
	},
	removeExercise: id => {
		// 删除运动库信息
		return request('/system/exercise/mini/remove/'+ id, 'Get', true);
	},
};
