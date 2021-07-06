"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var axios_1 = require("axios");
var TS_USER_AGENTS_1 = require("./TS_USER_AGENTS");
var $ = {};
var cookie = '', cookiesArr = [];
!(function () { return __awaiter(void 0, void 0, void 0, function () {
    var i, taskVos, tasks, _i, tasks_1, t, _a, _b, tp, _c, _d, tp, _e, _f, tp;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0: return [4 /*yield*/, requireConfig()];
            case 1:
                _g.sent();
                i = 0;
                _g.label = 2;
            case 2:
                if (!(i < cookiesArr.length)) return [3 /*break*/, 19];
                cookie = cookiesArr[i];
                $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1]);
                $.index = i + 1;
                $.isLogin = true;
                $.nickName = '';
                return [4 /*yield*/, TotalBean()];
            case 3:
                _g.sent();
                console.log("\n\u5F00\u59CB\u3010\u4EAC\u4E1C\u8D26\u53F7" + $.index + "\u3011" + ($.nickName || $.UserName) + "\n");
                return [4 /*yield*/, api('healthyDay_getHomeData', { "appId": "1EFVQwQ", "taskToken": "", "channelId": 1 })];
            case 4:
                taskVos = _g.sent();
                tasks = taskVos.data.result.taskVos;
                _i = 0, tasks_1 = tasks;
                _g.label = 5;
            case 5:
                if (!(_i < tasks_1.length)) return [3 /*break*/, 18];
                t = tasks_1[_i];
                console.log(t.taskName);
                if (!(t.status === 1)) return [3 /*break*/, 17];
                if (!t.shoppingActivityVos) return [3 /*break*/, 9];
                _a = 0, _b = t.shoppingActivityVos;
                _g.label = 6;
            case 6:
                if (!(_a < _b.length)) return [3 /*break*/, 9];
                tp = _b[_a];
                return [4 /*yield*/, doTask(tp.taskToken, t.taskId, t.waitDuration)];
            case 7:
                _g.sent();
                _g.label = 8;
            case 8:
                _a++;
                return [3 /*break*/, 6];
            case 9:
                if (!t.productInfoVos) return [3 /*break*/, 13];
                _c = 0, _d = t.productInfoVos;
                _g.label = 10;
            case 10:
                if (!(_c < _d.length)) return [3 /*break*/, 13];
                tp = _d[_c];
                console.log(tp.skuName, tp.taskToken);
                return [4 /*yield*/, doTask(tp.taskToken, t.taskId, t.waitDuration)];
            case 11:
                _g.sent();
                _g.label = 12;
            case 12:
                _c++;
                return [3 /*break*/, 10];
            case 13:
                if (!t.followShopVo) return [3 /*break*/, 17];
                _e = 0, _f = t.followShopVo;
                _g.label = 14;
            case 14:
                if (!(_e < _f.length)) return [3 /*break*/, 17];
                tp = _f[_e];
                console.log(tp.shopName, tp.taskToken);
                return [4 /*yield*/, doTask(tp.taskToken, t.taskId, 0)];
            case 15:
                _g.sent();
                _g.label = 16;
            case 16:
                _e++;
                return [3 /*break*/, 14];
            case 17:
                _i++;
                return [3 /*break*/, 5];
            case 18:
                i++;
                return [3 /*break*/, 2];
            case 19: return [2 /*return*/];
        }
    });
}); })();
function api(Fn, body) {
    var _this = this;
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1["default"].post("https://api.m.jd.com/client.action", "functionId=" + Fn + "&body=" + JSON.stringify(body) + "&client=wh5&clientVersion=1.0.0", {
                        headers: {
                            'Referer': 'https://h5.m.jd.com/babelDiy/Zeus/UQwNm9fNDey3xNEUTSgpYikqnXR/index.html',
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Origin': 'https://h5.m.jd.com',
                            'User-Agent': TS_USER_AGENTS_1["default"],
                            'Host': 'api.m.jd.com',
                            'cookie': cookie
                        }
                    })];
                case 1:
                    data = (_a.sent()).data;
                    resolve(data);
                    return [2 /*return*/];
            }
        });
    }); });
}
function doTask(taskToken, taskId, timeout) {
    var _this = this;
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(timeout !== 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, api('harmony_collectScore', { "appId": "1EFVQwQ", "taskToken": taskToken, "taskId": taskId, "actionType": 1 })];
                case 1:
                    res = _a.sent();
                    console.log('领取任务: ', res.data.bizMsg, '\n等待中...');
                    return [4 /*yield*/, wait(timeout * 1000)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, api('harmony_collectScore', { "appId": "1EFVQwQ", "taskToken": taskToken, "taskId": taskId, "actionType": 0 })];
                case 4:
                    res = _a.sent();
                    if (res.code === 0) {
                        try {
                            console.log("\u4EFB\u52A1\u6210\u529F: \u83B7\u5F97" + res.data.result.score * 1 + " \u4F59\u989D: " + res.data.result.userScore * 1);
                        }
                        catch (e) {
                            console.log("\u4EFB\u52A1\u9519\u8BEF: ", JSON.stringify(res));
                        }
                    }
                    return [4 /*yield*/, wait(1000)];
                case 5:
                    _a.sent();
                    resolve();
                    return [2 /*return*/];
            }
        });
    }); });
}
function wait(t) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, t);
    });
}
function requireConfig() {
    return new Promise(function (resolve) {
        console.log('\n====================Hello World====================\n');
        console.log('开始获取配置文件\n');
        var jdCookieNode = require('./jdCookie.js');
        Object.keys(jdCookieNode).forEach(function (item) {
            if (jdCookieNode[item]) {
                cookiesArr.push(jdCookieNode[item]);
            }
        });
        console.log("\u5171" + cookiesArr.length + "\u4E2A\u4EAC\u4E1C\u8D26\u53F7\n");
        resolve(0);
    });
}
function TotalBean() {
    var _this = this;
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            axios_1["default"].get('https://me-api.jd.com/user_new/info/GetJDUserInfoUnion', {
                headers: {
                    Host: "me-api.jd.com",
                    Connection: "keep-alive",
                    Cookie: cookie,
                    "User-Agent": TS_USER_AGENTS_1["default"],
                    "Accept-Language": "zh-cn",
                    "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
                    "Accept-Encoding": "gzip, deflate, br"
                }
            }).then(function (res) {
                if (res.data) {
                    var data = res.data;
                    if (data['retcode'] === "1001") {
                        $.isLogin = false; //cookie过期
                        return;
                    }
                    if (data['retcode'] === "0" && data['data'] && data.data.hasOwnProperty("userInfo")) {
                        $.nickName = data.data.userInfo.baseInfo.nickname;
                    }
                }
                else {
                    console.log('京东服务器返回空数据');
                }
            })["catch"](function (e) {
                console.log('Error:', e);
            });
            resolve();
            return [2 /*return*/];
        });
    }); });
}
