/*!
 * v2gogo-vue-js-sdk v1.3.2 
 *
 * 
 * Created by lcb
 *
 * Date: 2019-9-16
 */
window.user = {
    openId: undefined,
    id: undefined,
    userId: undefined,
    unionId: undefined,
    username: undefined,
    headImg: undefined,
    nickname: undefined,
    coin: undefined
};

window.app = {
    deviceToken: undefined,
    version: undefined,
    platform: undefined
};

/**
 * js调用原生交互
 引用说明  window.jsbrige.callNative(<方法名>,<参数>,<返回值回掉函数>)；
 //
 window.jsbrige.callNative('getSAPrepareAttribute',"",function(data){
  alert(data);
})
 }
 *
 */
function JSBrige() {
    window.funcMap = new Map();
    this.callNative = function (nativeMethodName, argument, callback) {
        let argumentTmp = argument;
        if (typeof nativeMethodName !== 'string') {
            throw new Error('Type of method must be string');
        }

        //Allowed types are Number, String, Date, Array,Object, and Null
        let type = typeof argument;
        let fliter = ["string", "number", "object", "null"];
        if (fliter.indexOf(type) === -1) {
            throw new Error('Type of argument must be number,string,object,and null');
        }

        if (type === "object") {
            argumentTmp = JSON.stringify(argument);
        }
        let call_id = nativeMethodName + Date.parse(new Date());
        if (callback != null && callback !== undefined) {
            funcMap[call_id] = callback;
        }

        if (window.v2ggAndroidNativeMethod !== undefined) {
            window.v2ggAndroidNativeMethod.postMessage(nativeMethodName, argumentTmp, call_id);
        } else {
            if (eval(`window.webkit.messageHandlers.${nativeMethodName}`) !== undefined) {
                let prames = {
                    _call_id: call_id,
                    argument: argument
                }
                let pramesTmp = JSON.stringify(prames);
                return eval(`window.webkit.messageHandlers.${nativeMethodName}.postMessage(${pramesTmp})`);
            } else {
                throw new Error('Not in native environment');
            }
        }
    }

    /**
     *  callId 调用原生参数能取到
     */
    this.iosCallback = function (callId, params) {
        let callback = funcMap[callId];
        //method(params);
        if (callback != null && callback !== undefined) {
            callback(params);
        }
        funcMap.delete(callId);
    }
}
window.jsbrige = new JSBrige();

window.v2gogoH5 = {
    jsbrige,
    user,
    app,
    jWeixinTest: function () {
        console.log('%c 🥠 wx: ', 'font-size:20px;background-color: #7F2B82;color:#fff;', wx);
        console.log('%c 🥛 jWeixin: ', 'font-size:20px;background-color: #7F2B82;color:#fff;', jWeixin);
    },
    initApp: function () {
        if (!this.isV2gogoApp()) {
            return false;
        }
        let v2gogoJson = window.sessionStorage.getItem("v2gogoappJson");
        if (v2gogoJson == null) {
            const userAgent = window.navigator.userAgent;
            v2gogoJson = userAgent.match(/v2ggapp(.*)/)[1].replace(" UIWebView", "");
            v2gogoJson = v2gogoJson.substr(1, v2gogoJson.length - 2);

        }
        const v2gogoObj = JSON.parse(v2gogoJson);
        if (v2gogoJson && v2gogoObj.user && v2gogoObj.user != null) {
            window.user = {
                id: v2gogoObj.user.id && v2gogoObj.user.id != null ? v2gogoObj.user.id : v2gogoObj.user.userId,
                userId: window.user.id,
                username: v2gogoObj.user.phone,
                nickname: v2gogoObj.user.nickname,
                coin: window.user.coin,
                headImg: window.user.headImg

            }
            window.app = {
                platform: '1', // v2gogoObj.platform;// platform 为1 才能获取到数据
                version: v2gogoObj.version,
                deviceToken: v2gogoObj.deviceToken
            }
            return true;
        }
        return false;
    },
    getFullApp: function () {
        let json = window.sessionStorage.getItem("v2gogoApp");
        if (json != null) {
            let obj = JSON.parse(json);
            if (obj && obj.version && obj.version != null) {
                return obj;
            }
        }
        return null;
    },
    getFullUser: function () {
        let json = window.sessionStorage.getItem("v2gogoUser");
        if (json != null) {
            let obj = JSON.parse(json);
            if (obj && obj.id && obj.id != null) {
                return obj;
            }
        }
        return null;
    },
    getUser: function () {
        if (!this.isV2gogoApp()) {
            return null;
        }
        let v2gogoJson = window.sessionStorage.getItem("v2gogoappJson");
        if (v2gogoJson == null) {
            const userAgent = window.navigator.userAgent;
            v2gogoJson = userAgent.match(/v2ggapp(.*)/)[1].replace(" UIWebView", "");
            v2gogoJson = v2gogoJson.substr(1, v2gogoJson.length - 2);
        }
        const v2gogoObj = JSON.parse(v2gogoJson);
        if (v2gogoJson && v2gogoObj.user && v2gogoObj.user != null) {
            return {
                id: v2gogoObj.user.id && v2gogoObj.user.id != null ? v2gogoObj.user.id : v2gogoObj.user.userId,
                username: v2gogoObj.user.phone,
                nickname: v2gogoObj.user.nickname
            };
        }
        return null;
    },
    getMiniProgramUser: function(){
        if(!this.isMiniProgram){
            return null;
        }
        let userId = this.getUrlParam("userId");
        if(userId && userId !== 'null'){
            return {
                id: userId
            }
        }
        return null
    },
    getUserById(id, vue, callback) {
        let url = '/user/getById';
        vue.$http.post(url + '?id=' + id)
            .then(function (response) {
                if (response.data.code === 0 &&
                    response.data.result != null &&
                    response.data.result.user != null) {
                    let user = response.data.result.user;
                    let img = user.img;
                    let u = {
                        id: user.id,
                        userId: user.id,
                        username: user.username,
                        nickname: user.fullname,
                        headImg: img,
                        coin: user.coin,
                    }
                    window.user = u;
                    window.app.deviceToken = user.devicetoken;
                    window.sessionStorage.setItem("v2gogoUser", JSON.stringify(u));
                    window.sessionStorage.setItem("v2gogoApp", JSON.stringify(window.app));
                    callback(u, window.app);
                } else {
                    callback();
                }
            }).catch(function () {
                callback();
            });
    },
    /**
     * 判断是否在APP内
     * @return {boolean}
     */
    isV2gogoApp: function () {
        return navigator.userAgent.indexOf("v2ggapp") > -1 || navigator.userAgent.indexOf("v2gogo") > -1;
    },

    isWeiXin: function () { // 判断是否在微信客户端内
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },
    appLogin: function() {
        let _this = this;
        window.jsbrige.callNative("loginApp", {}, function (data) {
            var v2gogoapp = JSON.parse(data);
            // user 不为空说明登录成功了  其他情况不处理
            if (v2gogoapp.user != null) {
                window.sessionStorage.setItem("v2gogoappJson", data);
            }
            window.location.reload();
        });
    },

    isQQ: function () {
        var ua = window.navigator.userAgent.toLowerCase();
        if ((ua.match(/QQ/i) == 'qq') || (ua.match(/MQQ/i) == 'mqq')) {
            return true;
        } else {
            return false;
        }
    },

    isAndroid: function () {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/android/i) == 'android') {
            return true;
        } else {
            return false;
        }
    },

    isIos: function () {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/ios/i) == 'ios') {
            return true;
        } else {
            return false;
        }
    },

    isPc: function () {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/Android|webOS|iPhone|iPod|BlackBerry/i)) {
            return false;
        } else {
            return true;
        }
    },

    isMiniProgram: function () {
        return window.__wxjs_environment === 'miniprogram';
        // return true;      // 本地调试用
    },

    getUrlParam: function (key) {
        var r, re;
        re = new RegExp("[?|&]" + key + "=(.*?)(&|$|#)(#?)"); // 兼容带有“＃login”的url地址，兼容SPA中自动在url地址最后面添加的“#/”
        r = window.location.href.match(re);
        if (r != null) return decodeURIComponent(r[1]);
        return null;
    },

    /**
     * 获得url中参数值
     * @param name  参数名
     * @param url   可为null 可以指定url
     * @returns {null}
     */
    getQueryString: function (name, url) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var url = url ? url : window.location.search.substr(1);
        var r = url.match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return null;
    },

    /**
     * 初始化分享按钮
     * @param {Object} shareInfo
     * @vue {Object} vue vue实例
     * example: var shareInfo = {
              title : "直播：" + liveStudio.title,
              desc : liveStudio.description,
              imgUrl : imagesPrefix + liveStudio.thumbnail + "?imageView2/2/w/300",
              url : window.location.href
          };
     */
    initAppShareBtn: function (shareInfo, vue) {
        if (this.isV2gogoApp() === true) {
            window.jsbrige.callNative('onShareInfo', shareInfo, function (data) {});
        } else if (this.isMiniProgram()) {
            this.miniProgramShareInit(shareInfo)
        } else if (this.isWeiXin()) {
            this.wxConfig(shareInfo, vue);
        }
    },
    miniProgramShareInit(shareInfo) {
        jWeixin.miniProgram.postMessage({
            data: JSON.stringify(shareInfo)
        })
    },

    /**
     * 申请使用微信JS接口
     * @param shareInfo
     * @vue {Object} vue vue实例
     */
    wxConfig: function (shareInfo, vue, callback) {
        var _this = this;
        vue.request({
            url: '/common/wxConfig',
            data: {
                url: window.location.href
            },
            success(response) {
                if (response.data.code === 0) {
                    var data = response.data.result;
                    jWeixin.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: data.appId, // 必填，公众号的唯一标识
                        timestamp: data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: data.nonceStr, // 必填，生成签名的随机串
                        signature: data.signature, // 必填，签名，见附录1
                        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseImage', 'uploadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    _this.wxReady(shareInfo);
                }
                if (callback) {
                    callback();
                }
            }
        })
    },

    /**
     * 微信对象已准备好时，初始化右上角分享按钮（分享给朋友，分享到朋友圈）
     * @param shareInfo
     */
    wxReady: function (shareInfo) {
        jWeixin.ready(function () {
            jWeixin.onMenuShareTimeline({ // 分享到朋友圈
                title: shareInfo.title,
                link: shareInfo.url, // 分享链接
                imgUrl: shareInfo.imgUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数                  
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                },
                fail: function (res) {}
            });
            jWeixin.onMenuShareAppMessage({ // 分享给朋友
                title: shareInfo.title,
                link: shareInfo.url, // 分享链接
                imgUrl: shareInfo.imgUrl, // 分享图标
                desc: shareInfo.desc,
                type: 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        });
    },

    addCookie: function (name, value, expireHours) {
        var cookieString = name + "=" + escape(value) + "; path=/";
        //判断是否设置过期时间
        if (expireHours > 0) {
            var date = new Date();
            date.setTime(date.getTime() + expireHours * 3600 * 1000);
            cookieString = cookieString + "; expires=" + date.toUTCString();
        }
        //默认的cookie时间，当天23时59分59秒
        if (typeof (expireHours) == 'undefined') {
            var date = new Date();
            date.setTime(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);
            cookieString = cookieString + "; expires=" + date.toUTCString();
        }
        document.cookie = cookieString;
    },

    getCookie: function (name) {
        var strcookie = document.cookie;
        var arrcookie = strcookie.split("; ");
        for (var i = 0; i < arrcookie.length; i++) {
            var arr = arrcookie[i].split("=");
            if (arr[0] == name) return arr[1];
        }
        return "";
    },

    /**
     * 过滤掉url地址中不openid和userId,防止被错误分享出去
     * @param s
     * @returns {XML|string|void}
     */
    shareUrlParamsFilter: function (s) {
        // 过滤掉pay，BXGZOpenId参数
        return s.replace(/&pay=\w+/, "").replace(/[(\?)|(&)]openid=.*/, "").replace(/[(\?)|(&)]userId=.*/, "");
    },

    /**
     * 初始化获取微信用户信息
     * @param redirectUrl 微信授权api
     */
    initWeiXinUser: function (redirectUrl) { // 初始化微信用户数据
        if (!this.isWeiXin()) {
            return;
        }
        var openid = this.getUrlParam("openid") || this.getCookie('openId');
        console.log(openid);
        var userId = this.getUrlParam("userId") || this.getCookie('userId');
        console.log(userId);
        var unionId = this.getUrlParam("unionId") || this.getCookie('unionId');
        console.log(unionId);
        console.log(window.user.unionId, 'window.user.unionId');
        if (!window.user.unionId) {
            if (!unionId) {
                alert(3)
                this.wxOAuth(redirectUrl);
            } else {
                alert(4)
                var newUrlWithoutOpenId = this.shareUrlParamsFilter(window.location.href); // 去掉微信授权回调页面url中openid参数，防止链接被用户错误打开
                this.addCookie("userId", userId, 'userId');
                window.user.userId = userId;
                this.addCookie("openId", openid, 'openId');
                window.user.openId = unionId;
                this.addCookie("unionId", unionId, 'unionId');
                window.user.unionId = userId;

                window.location.href = newUrlWithoutOpenId;
                alert('5')
                alert(window.location.href)
            }
        }
        return;
    },

    wxOAuth: function (redirectUrl) {
        // 登录地址
        // window.location.href = "/vote/webOAuth?redirectUrl=" + window.location.href;
        window.location.href = "/social/socialWeixin/getCode?redirectUrl=" + window.location.href;
    },

    /**
     * formate timastamp to time
     * @param {String} timestamp
     */
    formatTimestamp: function (timestamp, format) {
        var now = new Date(parseInt(timestamp));
        var date = {
            "M+": now.getMonth() + 1,
            "d+": now.getDate(),
            "h+": now.getHours(),
            "m+": now.getMinutes(),
            "s+": now.getSeconds(),
            "q+": Math.floor((now.getMonth() + 3) / 3),
            "S+": now.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (now.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
                    date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return format;
    },
    /**
     * 根据applink跳转相应小程序页面
     *
     * @return  {[string]}  [return 返回小程序页面路径]
     */
    changInnerLinkToMinipLink: function (innerLink) {
        var type, miniPLink;
        const RegExp = /type=([^&]*)(&|$)/;
        var match = innerLink.match(RegExp);
        /**
         * (1, "普通文章"),
            (2, "视频直播"),
            (3, "专题文章"),
            (4, "专题列表"),
            (5, "公益项目"),
            (6,"内部链接"),
            (7, "外部链接"),
            (10,"晒照片主题"),
            (12,"视频文章"),
            (35, "有赞商城");
         *
         *   
         */
        type = match[1];
        switch (type) {
            case "-1": //外部链接
                break;
            case "0": // 普通文章
                var srcId = this.getQueryString('srcId', innerLink)
                miniPLink = "/pages/newsDetails/newsDetails?id=" + srcId;
                break;
            case "1": // 兑换奖品详细
                miniPLink = "";
                break;
            case "4": // 原生晒照片列表
                miniPLink = "";
                break;
            case "5": // 兑换列表
                miniPLink = "";
                break;
            case "16": // 微兔家
                miniPLink = "";
                break;
            case "18": // 评论列表
                miniPLink = "";
                break;
            case "19": // 专区列表
                miniPLink = "";
                break;
            case "20": // 摇摇乐
                miniPLink = "";
                break;
            case "24": // 我的奖品列表
                miniPLink = "";
                break;
            case "25": // 跳转直播界面
                miniPLink = "";
                break;
            case "26": // 列表页面 v2gogo://?type=26&fragment=1 （0：全部/百姓关注，1，直播，2，视频，3专题）
                miniPLink = "";
                break;
            case "27": // 新闻大家评中奖名单
                miniPLink = "";
                break;
            case "28": // 爆料列表
                miniPLink = "";
                break;
            case "30": // 活动列表
                miniPLink = "";
                break;
            case "31": // 新闻页
                miniPLink = "";
                break;
            case "32": // 俱乐部详情页
                miniPLink = "";
                break;
            case "33": // 跳转到指定的App主页的指定页面
                miniPLink = "";
                break;
            case "34": // 正在兑换的奖品列表
                miniPLink = "";
                break;
            case "35": // 有赞商城
                miniPLink = "";
                break;
            default:
                miniPLink = ""; // 如何处理？ // 什么都不做呗.
                break;
        }
        return miniPLink;
    },
    /**
     * 获取指定时间的友好时间字符串。
     * @param str 指定的时间字符串，如yyyy-MM-dd HH:mm:ss
     * @param now 当前时间，允许时间戳，GMT时间，如果该参数为undefined，则使用浏览器时间。
     */
    getFriendlyTime(str, now) {
        var currentTime = new Date(now);
        var arr = str.split(/\s+/gi);
        var temp = 0,
            arr1, arr2, oldTime, delta;
        var getIntValue = function (ss, defaultValue) {
            try {
                return parseInt(ss, 10);
            } catch (e) {
                return defaultValue;
            }
        };
        var getWidthString = function (num) {
            return num < 10 ? ("0" + num) : num;
        };
        if (arr.length >= 2) {
            arr1 = arr[0].split(/[\/\-]/gi);
            arr2 = arr[1].split(":");
            oldTime = new Date();
            oldTime.setYear(getIntValue(arr1[0], currentTime.getFullYear()));
            oldTime.setMonth(getIntValue(arr1[1], currentTime.getMonth() + 1) - 1);
            oldTime.setDate(getIntValue(arr1[2], currentTime.getDate()));

            oldTime.setHours(getIntValue(arr2[0], currentTime.getHours()));
            oldTime.setMinutes(getIntValue(arr2[1], currentTime.getMinutes()));
            oldTime.setSeconds(getIntValue(arr2[2], currentTime.getSeconds()));

            delta = currentTime.getTime() - oldTime.getTime();

            if (delta <= 6000) {
                return "1分钟内";
            } else if (delta < 60 * 60 * 1000) {
                return Math.floor(delta / (60 * 1000)) + "分钟前";
            } else if (delta < 24 * 60 * 60 * 1000) {
                return Math.floor(delta / (60 * 60 * 1000)) + "小时前";
            } else if (delta < 30 * 24 * 60 * 60 * 1000) {
                return Math.floor(delta / (24 * 60 * 60 * 1000)) + "天前";
                // } else if (currentTime.getFullYear() != oldTime.getFullYear()) {
                //   return [getWidthString(oldTime.getFullYear()), getWidthString(oldTime.getMonth() + 1), getWidthString(oldTime.getDate())].join("-")
            } else {
                // return [getWidthString(oldTime.getMonth() + 1), getWidthString(oldTime.getDate())].join("-");
                return "30天前"
            }
        }
        return "";
    },
    // 类型检测 
    type: function (data) {
        var toString = Object.prototype.toString;
        var dataType =
            data instanceof Element ?
            "element" :
            toString
            .call(data)
            .replace(/\[object\s(.+)\]/, "$1")
            .toLowerCase();
        return dataType;
    },
    /**
     * 节流
     * @param fn     需要执行的函数
     * @param gapTime 时间间隔
     **/
    throttle: function (fn, gapTime) {
        if (gapTime == null || gapTime == undefined) {
            gapTime = 1000
        }

        let _lastTime = null
        return function () {
            let _nowTime = +new Date()
            if (_nowTime - _lastTime > gapTime || !_lastTime) {
                fn.apply(this, arguments)
                _lastTime = _nowTime
            }
        }
    },
    /**
     * 验证手机号码
     * 
     **/
    validatePhoneNumber: function (str) {
        let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
        return reg.test(str)
    },
    
}