"use strict";
var CACHE = [];
var YubinBango;
(function (YubinBango) {
    var Core = (function () {
        function Core(inputVal, callback) {
            if (inputVal === void 0) { inputVal = ''; }
            this.URL = 'https://yubinbango.github.io/yubinbango-data/data';
            this.REGION = [
                null, '北海道', '青森県', '岩手県', '宮城県',
                '秋田県', '山形県', '福島県', '茨城県', '栃木県',
                '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
                '新潟県', '富山県', '石川県', '福井県', '山梨県',
                '長野県', '岐阜県', '静岡県', '愛知県', '三重県',
                '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県',
                '和歌山県', '鳥取県', '島根県', '岡山県', '広島県',
                '山口県', '徳島県', '香川県', '愛媛県', '高知県',
                '福岡県', '佐賀県', '長崎県', '熊本県', '大分県',
                '宮崎県', '鹿児島県', '沖縄県'
            ];
            if (inputVal) {
                var a = inputVal.replace(/[０-９]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 65248); });
                var b = a.match(/\d/g);
                var c = b.join('');
                var yubin7 = this.chk7(c);
                if (yubin7) {
                    this.getAddr(yubin7, callback);
                }
                else {
                    callback(this.addrDic());
                }
            }
        }
        Core.prototype.chk7 = function (val) {
            if (val.length === 7) {
                return val;
            }
        };
        Core.prototype.addrDic = function (region_id, region, locality, street, extended) {
            if (region_id === void 0) { region_id = ''; }
            if (region === void 0) { region = ''; }
            if (locality === void 0) { locality = ''; }
            if (street === void 0) { street = ''; }
            if (extended === void 0) { extended = ''; }
            return {
                'region_id': region_id,
                'region': region,
                'locality': locality,
                'street': street,
                'extended': extended
            };
        };
        Core.prototype.selectAddr = function (addr) {
            if (addr && addr[0] && addr[1]) {
                return this.addrDic(addr[0], this.REGION[addr[0]], addr[1], addr[2], addr[3]);
            }
            else {
                return this.addrDic();
            }
        };
        Core.prototype.jsonp = function (url, fn) {
            window['$yubin'] = function (data) { return fn(data); };
            var scriptTag = document.createElement("script");
            scriptTag.setAttribute("type", "text/javascript");
            scriptTag.setAttribute("charset", "UTF-8");
            scriptTag.setAttribute("src", url);
            document.head.appendChild(scriptTag);
        };
        Core.prototype.getAddr = function (yubin7, fn) {
            var _this = this;
            var yubin3 = yubin7.substr(0, 3);
            if (yubin3 in CACHE && yubin7 in CACHE[yubin3]) {
                return fn(this.selectAddr(CACHE[yubin3][yubin7]));
            }
            else {
                this.jsonp(this.URL + "/" + yubin3 + ".js", function (data) {
                    CACHE[yubin3] = data;
                    return fn(_this.selectAddr(data[yubin7]));
                });
            }
        };
        return Core;
    }());
    YubinBango.Core = Core;
})(YubinBango || (YubinBango = {}));
module.exports = YubinBango;
//# sourceMappingURL=yubinbango-core.js.map