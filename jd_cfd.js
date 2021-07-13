"use strict";
/**
 * 京喜财富岛
 * 包含雇佣导游，建议每小时1次
 *
 * 此版本暂定默认不帮助
 * export CFD_HELP_HW = false    // 帮助wuzhi
 * export CFD_HELP_POOL = false  // 帮助助力池
 *
 * 使用jd_env_copy.js同步js环境变量到ts
 * 使用jd_ts_test.ts测试环境变量
 */
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var date_fns_1 = require("date-fns");
var axios_1 = require("axios");
var TS_USER_AGENTS_1 = require("./TS_USER_AGENTS");
var ts_md5_1 = require("ts-md5");
var dotenv = require("dotenv");
var CryptoJS = require('crypto-js');
dotenv.config();
var appId = 10028, fingerprint, token, enCryptMethodJD;
var cookie = '', cookiesArr = [], res = '', shareCodes = [];
var CFD_HELP_HW = process.env.CFD_HELP_HW ? process.env.CFD_HELP_HW : "false";
console.log('目前无任何助力功能', CFD_HELP_HW);
var CFD_HELP_POOL = process.env.CFD_HELP_POOL ? process.env.CFD_HELP_POOL : "false";
console.log('目前无任何助力功能', CFD_HELP_POOL);
var UserName, index, isLogin, nickName;
!(function () { return __awaiter(void 0, void 0, void 0, function () {
    var i, tasks, _i, _a, t, _b, _c, e, employ, _d, _e, t, _f, _g, b, data, e_1, data, e_2, i, j;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0: return [4 /*yield*/, requestAlgo()];
            case 1:
                _h.sent();
                return [4 /*yield*/, requireConfig()];
            case 2:
                _h.sent();
                i = 0;
                _h.label = 3;
            case 3:
                if (!(i < cookiesArr.length)) return [3 /*break*/, 36];
                cookie = cookiesArr[i];
                UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)[1]);
                index = i + 1;
                isLogin = true;
                nickName = '';
                console.log("\n\u5F00\u59CB\u3010\u4EAC\u4E1C\u8D26\u53F7" + index + "\u3011" + (nickName || UserName) + "\n");
                try {
                    //await makeShareCodes();
                }
                catch (e) {
                    console.log(e);
                }
                tasks = void 0;
                return [4 /*yield*/, api('story/GetActTask', '_cfd_t,bizCode,dwEnv,ptag,source,strZone')];
            case 4:
                tasks = _h.sent();
                _i = 0, _a = tasks.Data.TaskList;
                _h.label = 5;
            case 5:
                if (!(_i < _a.length)) return [3 /*break*/, 9];
                t = _a[_i];
                if (!(t.dwCompleteNum === t.dwTargetNum && t.dwAwardStatus === 2)) return [3 /*break*/, 8];
                return [4 /*yield*/, api('Award', '_cfd_t,bizCode,dwEnv,ptag,source,strZone,taskId', { taskId: t.ddwTaskId })];
            case 6:
                res = _h.sent();
                if (res.ret === 0) {
                    console.log(t.strTaskName + "\u9886\u5956\u6210\u529F:", res.data.prizeInfo);
                }
                return [4 /*yield*/, wait(1000)];
            case 7:
                _h.sent();
                _h.label = 8;
            case 8:
                _i++;
                return [3 /*break*/, 5];
            case 9: return [4 /*yield*/, api('user/EmployTourGuideInfo', '_cfd_t,bizCode,dwEnv,ptag,source,strZone')];
            case 10:
                // 导游
                res = _h.sent();
                if (!!res.TourGuideList) return [3 /*break*/, 11];
                console.log('手动雇佣4个试用导游');
                return [3 /*break*/, 16];
            case 11:
                _b = 0, _c = res.TourGuideList;
                _h.label = 12;
            case 12:
                if (!(_b < _c.length)) return [3 /*break*/, 16];
                e = _c[_b];
                if (!(e.strBuildIndex !== 'food' && e.ddwRemainTm === 0)) return [3 /*break*/, 15];
                return [4 /*yield*/, api('user/EmployTourGuide', '_cfd_t,bizCode,ddwConsumeCoin,dwEnv,dwIsFree,ptag,source,strBuildIndex,strZone', { ddwConsumeCoin: e.ddwCostCoin, dwIsFree: 0, strBuildIndex: e.strBuildIndex })];
            case 13:
                employ = _h.sent();
                console.log(employ);
                return [4 /*yield*/, wait(3000)];
            case 14:
                _h.sent();
                _h.label = 15;
            case 15:
                _b++;
                return [3 /*break*/, 12];
            case 16: return [4 /*yield*/, mainTask('GetUserTaskStatusList', '_cfd_t,bizCode,dwEnv,ptag,source,strZone,taskId', { taskId: 0 })];
            case 17:
                // 任务⬇️
                tasks = _h.sent();
                _d = 0, _e = tasks.data.userTaskStatusList;
                _h.label = 18;
            case 18:
                if (!(_d < _e.length)) return [3 /*break*/, 25];
                t = _e[_d];
                if (!(t.dateType === 2)) return [3 /*break*/, 24];
                if (!(t.awardStatus === 2 && t.completedTimes === t.targetTimes)) return [3 /*break*/, 21];
                console.log(1, t.taskName);
                return [4 /*yield*/, mainTask('Award', '_cfd_t,bizCode,dwEnv,ptag,source,strZone,taskId', { taskId: t.taskId })];
            case 19:
                res = _h.sent();
                console.log(res);
                if (res.ret === 0) {
                    console.log(t.taskName + "\u9886\u5956\u6210\u529F:", res.data.prizeInfo);
                }
                return [4 /*yield*/, wait(2000)];
            case 20:
                _h.sent();
                return [3 /*break*/, 24];
            case 21:
                if (!(t.awardStatus === 2 && t.completedTimes < t.targetTimes && (t.orderId === 2 || t.orderId === 3))) return [3 /*break*/, 24];
                return [4 /*yield*/, mainTask('DoTask', '_cfd_t,bizCode,configExtra,dwEnv,ptag,source,strZone,taskId', { taskId: t.taskId, configExtra: '' })];
            case 22:
                // console.log('做任务:', t.taskId, t.taskName, t.completedTimes, t.targetTimes)
                res = _h.sent();
                console.log('做任务:', res);
                return [4 /*yield*/, wait(5000)];
            case 23:
                _h.sent();
                _h.label = 24;
            case 24:
                _d++;
                return [3 /*break*/, 18];
            case 25:
                _f = 0, _g = ['food', 'fun', 'shop', 'sea'];
                _h.label = 26;
            case 26:
                if (!(_f < _g.length)) return [3 /*break*/, 35];
                b = _g[_f];
                return [4 /*yield*/, api('user/GetBuildInfo', '_cfd_t,bizCode,dwEnv,dwType,ptag,source,strBuildIndex,strZone', { strBuildIndex: b })];
            case 27:
                res = _h.sent();
                console.log(b + "\u5347\u7EA7\u9700\u8981:", res.ddwNextLvlCostCoin);
                return [4 /*yield*/, wait(1000)];
            case 28:
                _h.sent();
                if (!(res.dwCanLvlUp === 1)) return [3 /*break*/, 31];
                return [4 /*yield*/, api('user/BuildLvlUp', '_cfd_t,bizCode,ddwCostCoin,dwEnv,ptag,source,strBuildIndex,strZone', { ddwCostCoin: res.ddwNextLvlCostCoin, strBuildIndex: b })];
            case 29:
                res = _h.sent();
                if (!(res.iRet === 0)) return [3 /*break*/, 31];
                console.log("\u5347\u7EA7\u6210\u529F");
                return [4 /*yield*/, wait(2000)];
            case 30:
                _h.sent();
                _h.label = 31;
            case 31: return [4 /*yield*/, api('user/CollectCoin', '_cfd_t,bizCode,dwEnv,dwType,ptag,source,strBuildIndex,strZone', { strBuildIndex: b, dwType: '1' })];
            case 32:
                res = _h.sent();
                console.log(b + "\u6536\u91D1\u5E01:", res.ddwCoin);
                return [4 /*yield*/, wait(1000)];
            case 33:
                _h.sent();
                _h.label = 34;
            case 34:
                _f++;
                return [3 /*break*/, 26];
            case 35:
                i++;
                return [3 /*break*/, 3];
            case 36:
                if (!(CFD_HELP_HW === 'true')) return [3 /*break*/, 40];
                _h.label = 37;
            case 37:
                _h.trys.push([37, 39, , 40]);
                return [4 /*yield*/, axios_1["default"].get("")];
            case 38:
                data = (_h.sent()).data;
                shareCodes = __spreadArrays(shareCodes, data.jxcfd);
                console.log('获取wuzhi助力码成功');
                return [3 /*break*/, 40];
            case 39:
                e_1 = _h.sent();
                console.log('获取wuzhi助力码出错');
                return [3 /*break*/, 40];
            case 40:
                if (!(CFD_HELP_POOL === 'true')) return [3 /*break*/, 45];
                _h.label = 41;
            case 41:
                _h.trys.push([41, 43, , 44]);
                return [4 /*yield*/, axios_1["default"].get('')];
            case 42:
                data = (_h.sent()).data;
                console.log('获取到20个随机助力码:', data.data);
                shareCodes = __spreadArrays(shareCodes, data.data);
                return [3 /*break*/, 44];
            case 43:
                e_2 = _h.sent();
                console.log('获取助力池失败');
                return [3 /*break*/, 44];
            case 44: return [3 /*break*/, 46];
            case 45:
                console.log('你的设置是不帮助助力池！');
                _h.label = 46;
            case 46:
                i = 0;
                _h.label = 47;
            case 47:
                if (!(i < cookiesArr.length)) return [3 /*break*/, 53];
                j = 0;
                _h.label = 48;
            case 48:
                if (!(j < shareCodes.length)) return [3 /*break*/, 52];
                cookie = cookiesArr[i];
                console.log('去助力:', shareCodes[j]);
                return [4 /*yield*/, api('story/helpbystage', '_cfd_t,bizCode,dwEnv,ptag,source,strShareId,strZone', { strShareId: shareCodes[j] })];
            case 49:
                res = _h.sent();
                console.log('助力:', res);
                if (res.iRet === 2232 || res.sErrMsg === '今日助力次数达到上限，明天再来帮忙吧~') {
                    return [3 /*break*/, 52];
                }
                return [4 /*yield*/, wait(3000)];
            case 50:
                _h.sent();
                _h.label = 51;
            case 51:
                j++;
                return [3 /*break*/, 48];
            case 52:
                i++;
                return [3 /*break*/, 47];
            case 53: return [2 /*return*/];
        }
    });
}); })();
function api(fn, stk, params) {
    var _this = this;
    if (params === void 0) { params = {}; }
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        var url, key, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://m.jingxi.com/jxbfd/" + fn + "?strZone=jxbfd&bizCode=jxbfd&source=jxbfd&dwEnv=7&_cfd_t=" + Date.now() + "&ptag=&_ste=1&_=" + Date.now() + "&sceneval=2&_stk=" + encodeURIComponent(stk);
                    if (['GetUserTaskStatusList', 'Award', 'DoTask'].includes(fn)) {
                        console.log('api2');
                        url = "https://m.jingxi.com/newtasksys/newtasksys_front/" + fn + "?strZone=jxbfd&bizCode=jxbfddch&source=jxbfd&dwEnv=7&_cfd_t=" + Date.now() + "&ptag=&_stk=" + encodeURIComponent(stk) + "&_ste=1&_=" + Date.now() + "&sceneval=2";
                    }
                    if (Object.keys(params).length !== 0) {
                        key = void 0;
                        for (key in params) {
                            if (params.hasOwnProperty(key))
                                url += "&" + key + "=" + params[key];
                        }
                    }
                    url += '&h5st=' + decrypt(stk, url);
                    return [4 /*yield*/, axios_1["default"].get(url, {
                        headers: {
                            'Host': 'm.jingxi.com',
                            'Referer': 'https://st.jingxi.com/',
                            'User-Agent': TS_USER_AGENTS_1["default"],
                            'Cookie': cookie
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
function mainTask(fn, stk, params) {
    var _this = this;
    if (params === void 0) { params = {}; }
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        var url, key, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://m.jingxi.com/newtasksys/newtasksys_front/" + fn + "?strZone=jxbfd&bizCode=jxbfd&source=jxbfd&dwEnv=7&_cfd_t=" + Date.now() + "&ptag=&_stk=" + encodeURIComponent(stk) + "&_ste=1&_=" + Date.now() + "&sceneval=2";
                    if (Object.keys(params).length !== 0) {
                        key = void 0;
                        for (key in params) {
                            if (params.hasOwnProperty(key))
                                url += "&" + key + "=" + params[key];
                        }
                    }
                    url += '&h5st=' + decrypt(stk, url);
                    return [4 /*yield*/, axios_1["default"].get(url, {
                        headers: {
                            'X-Requested-With': 'com.jd.pingou',
                            'Referer': 'https://st.jingxi.com/',
                            'Host': 'm.jingxi.com',
                            'User-Agent': TS_USER_AGENTS_1["default"],
                            'Cookie': cookie
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
function makeShareCodes() {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var data, farm, pin;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1["default"].post('https://api.m.jd.com/client.action?functionId=initForFarm', "body=" + escape(JSON.stringify({ "version": 4 })) + "&appid=wh5&clientVersion=9.1.0", {
                    headers: {
                        "cookie": cookie,
                        "origin": "https://home.m.jd.com",
                        "referer": "https://home.m.jd.com/myJd/newhome.action",
                        "User-Agent": TS_USER_AGENTS_1["default"],
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                })];
                case 1:
                    data = (_a.sent()).data;
                    farm = data.farmUserPro.shareCode;
                    return [4 /*yield*/, api('user/QueryUserInfo', '_cfd_t,bizCode,ddwTaskId,dwEnv,ptag,source,strShareId,strZone', { ddwTaskId: '', strShareId: '', strMarkList: 'undefined' })];
                case 2:
                    res = _a.sent();
                    console.log('助力码:', res.strMyShareId);
                    shareCodes.push(res.strMyShareId);
                    pin = cookie.match(/pt_pin=([^;]*)/)[1];
                    pin = ts_md5_1.Md5.hashStr(pin);
                    axios_1["default"].get("https://api.sharecode.ga/api/jxcfd/insert?code=" + res.strMyShareId + "&farm=" + farm + "&pin=" + pin)
                        .then(function (res) {
                            if (res.data.code === 200)
                                console.log('已自动提交助力码');
                            else
                                console.log('提交失败！已提交farm的cookie才可提交cfd');
                            resolve();
                        })["catch"](function (e) {
                        reject('访问助力池出错');
                    });
                    return [2 /*return*/];
            }
        });
    }); });
}
function requestAlgo() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, generateFp()];
                case 1:
                    fingerprint = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var data, enCryptMethodJDString;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, axios_1["default"].post('https://cactus.jd.com/request_algo?g_ty=ajax', {
                                    "version": "1.0",
                                    "fp": fingerprint,
                                    "appId": appId,
                                    "timestamp": Date.now(),
                                    "platform": "web",
                                    "expandParams": ""
                                }, {
                                    "headers": {
                                        'Authority': 'cactus.jd.com',
                                        'Pragma': 'no-cache',
                                        'Cache-Control': 'no-cache',
                                        'Accept': 'application/json',
                                        'User-Agent': TS_USER_AGENTS_1["default"],
                                        'Content-Type': 'application/json',
                                        'Origin': 'https://st.jingxi.com',
                                        'Sec-Fetch-Site': 'cross-site',
                                        'Sec-Fetch-Mode': 'cors',
                                        'Sec-Fetch-Dest': 'empty',
                                        'Referer': 'https://st.jingxi.com/',
                                        'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7'
                                    }
                                })];
                                case 1:
                                    data = (_a.sent()).data;
                                    if (data['status'] === 200) {
                                        token = data.data.result.tk;
                                        enCryptMethodJDString = data.data.result.algo;
                                        if (enCryptMethodJDString)
                                            enCryptMethodJD = new Function("return " + enCryptMethodJDString)();
                                    }
                                    else {
                                        console.log("fp: " + fingerprint);
                                        console.log('request_algo 签名参数API请求失败:');
                                    }
                                    resolve(200);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            }
        });
    });
}
function decrypt(stk, url) {
    var timestamp = (date_fns_1.format(new Date(), 'yyyyMMddhhmmssSSS'));
    var hash1;
    if (fingerprint && token && enCryptMethodJD) {
        hash1 = enCryptMethodJD(token, fingerprint.toString(), timestamp.toString(), appId.toString(), CryptoJS).toString(CryptoJS.enc.Hex);
    }
    else {
        var random = '5gkjB6SpmC9s';
        token = "tk01wcdf61cb3a8nYUtHcmhSUFFCfddDPRvKvYaMjHkxo6Aj7dhzO+GXGFa9nPXfcgT+mULoF1b1YIS1ghvSlbwhE0Xc";
        fingerprint = 9686767825751161;
        // $.fingerprint = 7811850938414161;
        var str = "" + token + fingerprint + timestamp + appId + random;
        hash1 = CryptoJS.SHA512(str, token).toString(CryptoJS.enc.Hex);
    }
    var st = '';
    stk.split(',').map(function (item, index) {
        st += item + ":" + getQueryString(url, item) + (index === stk.split(',').length - 1 ? '' : '&');
    });
    var hash2 = CryptoJS.HmacSHA256(st, hash1.toString()).toString(CryptoJS.enc.Hex);
    return encodeURIComponent(["".concat(timestamp.toString()), "".concat(fingerprint.toString()), "".concat(appId.toString()), "".concat(token), "".concat(hash2)].join(";"));
}
function requireConfig() {
    return new Promise(function (resolve) {
        console.log('开始获取配置文件\n');
        var jdCookieNode = require('./jdCookie.js');
        Object.keys(jdCookieNode).forEach(function (item) {
            if (jdCookieNode[item]) {
                cookiesArr.push(jdCookieNode[item]);
            }
        });
        console.log("\u5171" + cookiesArr.length + "\u4E2A\u4EAC\u4E1C\u8D26\u53F7\n");
        resolve();
    });
}
function generateFp() {
    var e = "0123456789";
    var a = 13;
    var i = '';
    for (; a--;)
        i += e[Math.random() * e.length | 0];
    return (i + Date.now()).slice(0, 16);
}
function getQueryString(url, name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = url.split('?')[1].match(reg);
    if (r != null)
        return unescape(r[2]);
    return '';
}
function wait(t) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, t);
    });
}
