(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/main"],{

/***/ 0:
/*!******************************************************************!*\
  !*** C:/Users/86152/Desktop/project/health-clock-uniapp/main.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, uni, createApp) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ 27));
var _store = _interopRequireDefault(__webpack_require__(/*! @/store */ 40));
var _assetsConfig = _interopRequireDefault(__webpack_require__(/*! @/config/assets.config.js */ 42));
var _indexConfig = _interopRequireDefault(__webpack_require__(/*! @/config/index.config.js */ 43));
var _routesConfig = _interopRequireDefault(__webpack_require__(/*! @/config/routes.config.js */ 44));
var _formRuleConfig = _interopRequireDefault(__webpack_require__(/*! @/config/formRule.config.js */ 45));
var _constDataConfig = _interopRequireDefault(__webpack_require__(/*! @/config/constData.config.js */ 41));
var _settingConfig = _interopRequireDefault(__webpack_require__(/*! @/config/setting.config.js */ 46));
var _request = __webpack_require__(/*! @/utils/request */ 47);
var _graceChecker = _interopRequireDefault(__webpack_require__(/*! @/utils/graceChecker */ 52));
var _helper = _interopRequireDefault(__webpack_require__(/*! @/utils/helper */ 49));
var _router = _interopRequireDefault(__webpack_require__(/*! @/utils/router */ 50));
var _requests = _interopRequireDefault(__webpack_require__(/*! ./utils/requests.js */ 36));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
var rfImage = function rfImage() {
  __webpack_require__.e(/*! require.ensure | components/oa-image/oa-image */ "components/oa-image/oa-image").then((function () {
    return resolve(__webpack_require__(/*! @/components/oa-image/oa-image */ 224));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var rfEmpty = function rfEmpty() {
  __webpack_require__.e(/*! require.ensure | components/oa-empty/index */ "components/oa-empty/index").then((function () {
    return resolve(__webpack_require__(/*! @/components/oa-empty */ 231));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var rfLoading = function rfLoading() {
  __webpack_require__.e(/*! require.ensure | components/oa-loading/index */ "components/oa-loading/index").then((function () {
    return resolve(__webpack_require__(/*! @/components/oa-loading */ 238));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var rfLoadProgress = function rfLoadProgress() {
  __webpack_require__.e(/*! require.ensure | components/oa-load-progress/oa-load-progress */ "components/oa-load-progress/oa-load-progress").then((function () {
    return resolve(__webpack_require__(/*! @/components/oa-load-progress/oa-load-progress */ 245));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var rfParser = function rfParser() {
  Promise.all(/*! require.ensure | components/oa-parser/index */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/oa-parser/index")]).then((function () {
    return resolve(__webpack_require__(/*! @/components/oa-parser */ 250));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var rfBackTop = function rfBackTop() {
  __webpack_require__.e(/*! require.ensure | components/oa-back-top/index */ "components/oa-back-top/index").then((function () {
    return resolve(__webpack_require__(/*! @/components/oa-back-top */ 260));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var rfTag = function rfTag() {
  __webpack_require__.e(/*! require.ensure | components/oa-tag/index */ "components/oa-tag/index").then((function () {
    return resolve(__webpack_require__(/*! @/components/oa-tag */ 267));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var rfNavDetail = function rfNavDetail() {
  __webpack_require__.e(/*! require.ensure | components/oa-nav-detail/index */ "components/oa-nav-detail/index").then((function () {
    return resolve(__webpack_require__(/*! @/components/oa-nav-detail */ 274));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var cuCustom = function cuCustom() {
  __webpack_require__.e(/*! require.ensure | components/cu-custom/index */ "components/cu-custom/index").then((function () {
    return resolve(__webpack_require__(/*! @/components/cu-custom */ 281));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
//引入异步请求函数
_vue.default.prototype.requests = _requests.default.requests; //挂载到全局
// 网络状态监听
uni.getNetworkType({
  success: function success(res) {
    _store.default.dispatch('networkStateChange', res.networkType);
  }
});
uni.onNetworkStatusChange(function (res) {
  _store.default.dispatch('networkStateChange', res.networkType);
});
// 挂载全局自定义方法
_vue.default.prototype.$mStore = _store.default;
_vue.default.prototype.$http = _request.http;
_vue.default.prototype.$mConfig = _indexConfig.default;
_vue.default.prototype.$mAssetsPath = _assetsConfig.default;
_vue.default.prototype.$mFormRule = _formRuleConfig.default;
_vue.default.prototype.$mRoutesConfig = _routesConfig.default;
_vue.default.prototype.$mConstDataConfig = _constDataConfig.default;
_vue.default.prototype.$mSettingConfig = _settingConfig.default;
_vue.default.prototype.$mGraceChecker = _graceChecker.default;
_vue.default.prototype.$mHelper = _helper.default;
_vue.default.prototype.$mRouter = _router.default;
_vue.default.component('rfImage', rfImage);
_vue.default.component('rfEmpty', rfEmpty);
_vue.default.component('rfLoading', rfLoading);
_vue.default.component('rfLoadProgress', rfLoadProgress);
_vue.default.component('rfParser', rfParser);
_vue.default.component('rfBackTop', rfBackTop);
_vue.default.component('rfTag', rfTag);
_vue.default.component('rfNavDetail', rfNavDetail);
_vue.default.component('cuCustom', cuCustom);
if (false) {}
_App.default.mpType = 'app';
_vue.default.mixin({
  computed: {
    themeColor: {
      get: function get() {
        return _store.default.getters.themeColor;
      },
      set: function set(val) {
        _store.default.state.themeColor = val;
      }
    }
  }
});
_vue.default.prototype.moneySymbol = _constDataConfig.default.moneySymbol;
_vue.default.prototype.singleSkuText = _constDataConfig.default.singleSkuText;

// 保留小数点后两位
_vue.default.filter('keepTwoDecimal', function (value) {
  return (Math.floor((value || 0) * 100) / 100).toFixed(2);
});
var app = new _vue.default(_objectSpread(_objectSpread({}, _App.default), {}, {
  store: _store.default
}));
createApp(app).$mount();
var baseUrl = "http://localhost:9314";
_vue.default.prototype.url = {
  login: baseUrl + "/login",
  // 登录
  logout: baseUrl + "/logout",
  // 退出登录
  getEmailCode: baseUrl + "/getEmailCode",
  // 登录
  getNoticeList: baseUrl + '/system/notice/list',
  // 查询公告列表
  editUserInfo: baseUrl + '/system/user/editUserInfo',
  // 修改用户
  getUserByUserName: baseUrl + "/system/user/getUserByUserName",
  // 通过用户名查询用户
  resetPwdMini: baseUrl + "/system/user/resetPwdMini" // 修改密码
};

_vue.default.prototype.ajax = function (url, method, data, fun) {
  uni.request({
    "url": url,
    "method": method,
    "header": {
      'Authorization': 'Bearer ' + uni.getStorageSync('token')
    },
    "data": data,
    success: function success(resp) {
      if (resp.statusCode === 200 && resp.data.code === 401) {
        uni.showModal({
          title: '提示',
          content: '登录状态已过期，请您重新登录!',
          cancelText: '取消',
          confirmText: '重新登录',
          success: function success(res) {
            if (res.confirm) {
              try {
                uni.removeStorageSync('token');
                uni.removeStorageSync('userInfo');
              } catch (e) {
                // error
                console.log(e);
              }
              uni.reLaunch({
                url: '/pages/public/login'
              });
            } else {
              uni.reLaunch({
                url: '/pages/index/index.vue'
              });
            }
          }
        });
      } else if (resp.statusCode === 200 && resp.data.code === 200) {
        var _data = resp.data;
        if (_data.hasOwnProperty("token")) {
          var token = _data.token;
          uni.setStorageSync("token", token);
        }
        fun(resp);
      } else if (resp.data.status === 403) {
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
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createApp"]))

/***/ }),

/***/ 27:
/*!******************************************************************!*\
  !*** C:/Users/86152/Desktop/project/health-clock-uniapp/App.vue ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ 28);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=scss& */ 37);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 39);
var render, staticRenderFns, recyclableRender, components
var renderjs





/* normalize component */

var component = Object(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null,
  false,
  components,
  renderjs
)

component.options.__file = "App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 28:
/*!*******************************************************************************************!*\
  !*** C:/Users/86152/Desktop/project/health-clock-uniapp/App.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=script&lang=js& */ 29);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 29:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/86152/Desktop/project/health-clock-uniapp/App.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, wx) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 30));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 32));
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _basic = __webpack_require__(/*! @/api/basic */ 33);
var _login = __webpack_require__(/*! @/api/login */ 34);
var _vuex = __webpack_require__(/*! vuex */ 35);
var _requests = _interopRequireDefault(__webpack_require__(/*! ./utils/requests.js */ 36));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
uni.$ajax = _requests.default.requests; //挂载全局请求方法
var _default = {
  onLaunch: function onLaunch() {
    var _this2 = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this2.initData();
            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  onHide: function onHide() {},
  methods: _objectSpread(_objectSpread({}, (0, _vuex.mapMutations)(['setNotifyNum'])), {}, {
    // 数据初始化
    initData: function initData() {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var _this, token;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // 获取页面设置配置
                _this = _this3;
                token = uni.getStorageSync('accessToken'); // 获取系统title高度
                _context2.next = 4;
                return _this3.initSystemInfo();
              case 4:
                if (!token) {
                  _context2.next = 7;
                  break;
                }
                _context2.next = 7;
                return _this3.handleVerifyAccessToken(token);
              case 7:
                if (_this3.$mStore.getters.hasLogin) {
                  // 初始化Websocket
                  // await this.$mWebsocket.initWebsocket();
                  // 初始化数量
                  _this3.setNotifyNum(uni.getStorageSync('notifyNum') || 0);
                }
              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    // 初始化系统信息
    initSystemInfo: function initSystemInfo() {
      uni.getSystemInfo({
        success: function success(e) {
          _vue.default.prototype.StatusBar = e.statusBarHeight;
          var custom = wx.getMenuButtonBoundingClientRect();
          _vue.default.prototype.Custom = custom;
          _vue.default.prototype.CustomBar = custom.top - e.statusBarHeight;
        }
      });
    },
    // 设备绑定(app推送)
    handleBindingEquipment: function handleBindingEquipment(id, token) {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var oauth_client;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                oauth_client = uni.getSystemInfoSync().platform;
                _context3.next = 3;
                return _this4.$http.post(_basic.bindingEquipment, {
                  token: token,
                  oauth_client: oauth_client,
                  oauth_client_user_id: id
                });
              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    handleVerifyAccessToken: function handleVerifyAccessToken(token) {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _this5.$http.post(_login.verifyAccessToken, {
                  token: token
                }).then(function (r) {
                  if (!r.data.token) {
                    _this5.$mStore.commit('logout');
                  }
                });
              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    // 推送消息跳转
    navTo: function navTo(item) {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var route, id, type;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = item.target_id;
                type = item.target_type;
                _context5.t0 = type;
                _context5.next = 5;
                break;
              case 5:
                route = '/pages/index/index';
                return _context5.abrupt("break", 7);
              case 7:
                if (route) _this6.$mRouter.push({
                  route: route
                });
              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    }
  })
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"]))

/***/ }),

/***/ 37:
/*!****************************************************************************************************!*\
  !*** C:/Users/86152/Desktop/project/health-clock-uniapp/App.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=style&index=0&lang=scss& */ 38);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 38:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/86152/Desktop/project/health-clock-uniapp/App.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[0,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/main.js.map