(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('axios')) :
	typeof define === 'function' && define.amd ? define(['axios'], factory) :
	(global.eddSlCachingProxyJs = factory(global.axios));
}(this, (function (axios) { 'use strict';

axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */













function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
}

var EDDSL = /** @class */ (function () {
    /**
     *
     * @param proxyURL the url to the proxy server
     */
    function EDDSL(proxyURL) {
        this.proxyURL = proxyURL;
    }
    /**
     * checks a license to see if it is still valid
     *
     * async and cached
     *
     * @param license the EDD License
     * @param itemId  the item ID that the license belongs too
     * @param activationId a string representing a unique install or device. EDD uses url
     */
    EDDSL.prototype.licenseCheck = function (license, itemId, activationId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.licenseRequest(license, itemId, activationId, "check")];
            });
        });
    };
    /**
     * activate a license
     *
     * async
     *
     * @param license edd license
     * @param itemId the itemId of the license to activate
     * @param activationId a string that uniqiely IDs the device
     */
    EDDSL.prototype.licenseActivate = function (license, itemId, activationId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.licenseRequest(license, itemId, activationId, "activate")];
            });
        });
    };
    /**
     * deactivate a license
     *
     * async
     *
     * @param license edd license
     * @param itemId the itemId of the license to deactivate
     * @param activationId a string that uniqiely IDs the device
     */
    EDDSL.prototype.licenseDeactivate = function (license, itemId, activationId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.licenseRequest(license, itemId, activationId, "deactivate")];
            });
        });
    };
    /**
     * requires that the user is loggedIn already
     *
     * async
     *
     * @param productName this is the Item Name, NOT the Item Id that is used on the license methods
     * @returns an array of licenses with sales data
     */
    EDDSL.prototype.userLicenses = function (productName) {
        if (productName === void 0) { productName = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var token, query, opts, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = this.getStoredToken();
                        query = productName ? { productName: productName } : {};
                        if (!token)
                            throw Error("No Token. Login first");
                        opts = {
                            method: "GET",
                            url: this.proxyURL + "/user/licenses",
                            params: query,
                            headers: {
                                "Content-Type": "application/json",
                                authorization: "Bearer " + token
                            }
                        };
                        return [4 /*yield*/, axios(opts)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    /**
     * login to EDD/Wordpress But firebase token
     * @param username the username or email address for the wordpress account
     * @param password the password
     */
    EDDSL.prototype.loginForFirebase = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var opts, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        opts = {
                            method: "POST",
                            url: this.proxyURL + "/wp/loginForFirebase",
                            headers: { "Content-Type": "application/json" },
                            data: {
                                username: username,
                                password: password
                            }
                        };
                        return [4 /*yield*/, axios(opts)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    /**
     * login to EDD/Wordpress
     * @param username the username or email address for the wordpress account
     * @param password the password
     */
    EDDSL.prototype.login = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var opts, result, data, userData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        opts = {
                            method: "POST",
                            url: this.proxyURL + "/wp/login",
                            headers: { "Content-Type": "application/json" },
                            data: {
                                username: username,
                                password: password
                            }
                        };
                        return [4 /*yield*/, axios(opts)];
                    case 1:
                        result = _a.sent();
                        data = result.data;
                        userData = Object.assign({}, data);
                        delete userData.token;
                        this.storeUserData(data);
                        return [2 /*return*/, userData];
                }
            });
        });
    };
    /**
     * gets the user data from storage
     *
     * not async
     */
    EDDSL.prototype.user = function () {
        var userData = this.getUserDataFromStorage();
        if (userData) {
            delete userData.token;
            return userData;
        }
        return null;
    };
    /**
     * log the currently logged in user out
     *
     * removes token and user data, but does not revoke the token
     */
    EDDSL.prototype.logout = function () {
        this.deleteStoredUserData();
        return true;
    };
    /**
     * is the user logged in or not
     *
     * async
     *
     * @returns {boolean} if the user is logged in
     */
    EDDSL.prototype.isLoggedIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userData, token, opts, result, data, valid, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userData = this.getUserDataFromStorage();
                        if (userData) {
                            token = userData.token;
                        }
                        else {
                            token = ""; // maybe a better way to do this ??
                        }
                        opts = {
                            method: "POST",
                            url: this.proxyURL + "/wp/validate",
                            headers: {
                                "Content-Type": "application/json",
                                authorization: "Bearer " + token
                            }
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios(opts)];
                    case 2:
                        result = _a.sent();
                        data = result.data;
                        valid = data.code === "jwt_auth_valid_token";
                        return [2 /*return*/, true];
                    case 3:
                        e_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param license the license to work with
     * @param itemId the item id for the product
     * @param activationId the unique id for this activation
     * @param action what action to take
     */
    EDDSL.prototype.licenseRequest = function (license, itemId, activationId, action) {
        return __awaiter(this, void 0, void 0, function () {
            var opts, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        opts = {
                            method: "get",
                            url: this.proxyURL + "/license/" + license + "/" + action,
                            params: {
                                itemId: itemId,
                                activationId: activationId
                            }
                        };
                        return [4 /*yield*/, axios(opts)];
                    case 1:
                        r = _a.sent();
                        return [2 /*return*/, r.data];
                }
            });
        });
    };
    EDDSL.prototype.getUserDataFromStorage = function () {
        var s = localStorage.getItem("wp-user-data");
        if (!s)
            return null;
        var userData = JSON.parse(s);
        return userData;
    };
    EDDSL.prototype.deleteStoredUserData = function () {
        localStorage.removeItem("wp-user-data");
    };
    EDDSL.prototype.storeUserData = function (data) {
        var json = JSON.stringify(data);
        localStorage.setItem("wp-user-data", json);
    };
    EDDSL.prototype.getStoredToken = function () {
        var userData = this.getUserDataFromStorage();
        var token;
        if (userData) {
            token = userData.token;
        }
        else {
            token = "";
        }
        return token;
    };
    return EDDSL;
}());

return EDDSL;

})));
//# sourceMappingURL=edd-sl-caching-proxy-js.umd.js.map
