(function (mod) {
    if (typeof exports == "object" || typeof exports === 'function' && typeof module == "object") {
        module.exports = mod();
    }
    else if (typeof define == "function" && define.amd) {
        return define([], mod);
    }
    else {
        window.base64 = mod();
    }
})(function () {
    var BASE64_MAPPING = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'];
    var _toBinary = function(ascii) {
        var binary = new Array();
        while (ascii > 0) {
            var b = ascii % 2;
            ascii = Math.floor(ascii / 2);
            binary.push(b);
        }
        binary.reverse();
        return binary;
    };
    var _toDecimal = function(binary) {
        var dec = 0;
        var p = 0;
        for (var i = binary.length - 1; i >= 0; --i) {
            var b = binary[i];
            if (b == 1) {
                dec += Math.pow(2, p);
            }
            ++p;
        }
        return dec;
    };
    var _toUTF8Binary = function(c, binaryArray) {
        var mustLen = (8 - (c + 1)) + ((c - 1) * 6);
        var fatLen = binaryArray.length;
        var diff = mustLen - fatLen;
        while (--diff >= 0) {
            binaryArray.unshift(0);
        }
        var binary = [];
        var _c = c;
        while (--_c >= 0) {
            binary.push(1);
        }
        binary.push(0);
        var i = 0,
            len = 8 - (c + 1);
        for (; i < len; ++i) {
            binary.push(binaryArray[i]);
        }
        for (var j = 0; j < c - 1; ++j) {
            binary.push(1);
            binary.push(0);
            var sum = 6;
            while (--sum >= 0) {
                binary.push(binaryArray[i++]);
            }
        }
        return binary;
    };

    var Base64 = {
        /**
         * 对字符串进行base64编码
         * @param inputString
         * @returns {string}
         */
        encode: function(inputString) {
            var base64_Index = [];
            var binaryArray = [];
            for (var i = 0, len = inputString.length; i < len; ++i) {
                var unicode = inputString.charCodeAt(i);
                var _tmpBinary = _toBinary(unicode);
                if (unicode < 0x80) {
                    var _tmpdiff = 8 - _tmpBinary.length;
                    while (--_tmpdiff >= 0) {
                        _tmpBinary.unshift(0);
                    }
                    binaryArray = binaryArray.concat(_tmpBinary);
                } else if (unicode >= 0x80 && unicode <= 0x7FF) {
                    binaryArray = binaryArray.concat(_toUTF8Binary(2, _tmpBinary));
                } else if (unicode >= 0x800 && unicode <= 0xFFFF) {
                    binaryArray = binaryArray.concat(_toUTF8Binary(3, _tmpBinary));
                } else if (unicode >= 0x10000 && unicode <= 0x1FFFFF) {
                    binaryArray = binaryArray.concat(_toUTF8Binary(4, _tmpBinary));
                } else if (unicode >= 0x200000 && unicode <= 0x3FFFFFF) {
                    binaryArray = binaryArray.concat(_toUTF8Binary(5, _tmpBinary));
                } else if (unicode >= 4000000 && unicode <= 0x7FFFFFFF) {
                    binaryArray = binaryArray.concat(_toUTF8Binary(6, _tmpBinary));
                }
            }
            var extra_Zero_Count = 0;
            for (var i = 0, len = binaryArray.length; i < len; i += 6) {
                var diff = (i + 6) - len;
                if (diff == 2) {
                    extra_Zero_Count = 2;
                } else if (diff == 4) {
                    extra_Zero_Count = 4;
                }
                var _tmpExtra_Zero_Count = extra_Zero_Count;
                while (--_tmpExtra_Zero_Count >= 0) {
                    binaryArray.push(0);
                }
                base64_Index.push(_toDecimal(binaryArray.slice(i, i + 6)));
            }
            var base64 = '';
            for (var i = 0, len = base64_Index.length; i < len; ++i) {
                base64 += BASE64_MAPPING[base64_Index[i]];
            }
            for (var i = 0, len = extra_Zero_Count / 2; i < len; ++i) {
                base64 += '=';
            }
            return base64;
        },
        /**
         * 对字符串进行base64解码
         * @param base64String
         * @returns {string}
         */
        decode: function(base64String) {
            var _len = base64String.length;
            var extra_Zero_Count = 0;
            if (base64String.charAt(_len - 1) == '=') {
                if (base64String.charAt(_len - 2) == '=') {
                    extra_Zero_Count = 4;
                    base64String = base64String.substring(0, _len - 2);
                } else {
                    extra_Zero_Count = 2;
                    base64String = base64String.substring(0, _len - 1);
                }
            }
            var binaryArray = [];
            for (var i = 0, len = base64String.length; i < len; ++i) {
                var c = base64String.charAt(i);
                for (var j = 0, size = BASE64_MAPPING.length; j < size; ++j) {
                    if (c == BASE64_MAPPING[j]) {
                        var _tmp = _toBinary(j);
                        var _tmpLen = _tmp.length;
                        if (6 - _tmpLen > 0) {
                            for (var k = 6 - _tmpLen; k > 0; --k) {
                                _tmp.unshift(0);
                            }
                        }
                        binaryArray = binaryArray.concat(_tmp);
                        break;
                    }
                }
            }
            if (extra_Zero_Count > 0) {
                binaryArray = binaryArray.slice(0, binaryArray.length - extra_Zero_Count);
            }
            var unicode = [];
            var unicodeBinary = [];
            for (var i = 0, len = binaryArray.length; i < len;) {
                if (binaryArray[i] == 0) {
                    unicode = unicode.concat(_toDecimal(binaryArray.slice(i, i + 8)));
                    i += 8;
                } else {
                    var sum = 0;
                    while (i < len) {
                        if (binaryArray[i] == 1) {++sum;
                        } else {
                            break;
                        }
                        ++i;
                    }
                    unicodeBinary = unicodeBinary.concat(binaryArray.slice(i + 1, i + 8 - sum));
                    i += 8 - sum;
                    while (sum > 1) {
                        unicodeBinary = unicodeBinary.concat(binaryArray.slice(i + 2, i + 8));
                        i += 8; --sum;
                    }
                    unicode = unicode.concat(_toDecimal(unicodeBinary));
                    unicodeBinary = [];
                }
            }
            var str = '';
            for(var i = 0 , len =  unicode.length ; i < len ;++i){
                str += String.fromCharCode(unicode[i]);
            }
            return str;
        }
    };

    /**
     * 对文件进行base64编码
     * @param filePath
     * @returns {String}
     */
    Base64.enfile = function(filePath){
        var bin = require('fs').readFileSync(filePath);
        var b64 = typeof ActiveXObject === 'function' ? base64OrBin(bin) : base64OrBuf(bin);

        return b64;
    };

    /**
     * 对文件进行base64解码
     * @param content
     * @param filePath
     */
    Base64.defile = function(base64String, filePath){
        var bin = typeof ActiveXObject === 'function' ? base64OrBin(base64String) : base64OrBuf(base64String);
        require('fs').writeFileSync(filePath, bin);
    };

    /**
     * base64与binary互转, 用于NodeAsp环境
     * @param obj
     * @returns {*}
     */
    function base64OrBin(obj) {
        var xml = new ActiveXObject('Microsoft.XMLDOM');
        var node = xml.createElement("obj");
        node.dataType = "bin.base64";
        obj = 'string' == typeof obj ? (node.text = obj, node.nodeTypedValue) : (node.nodeTypedValue = obj, node.text);
        node = xml = null;
        return obj;
    }

    /**
     * base64与buffer互转, 用于node环境
     * @param obj
     * @returns {*}
     */
    function base64OrBuf(obj) {
        return typeof obj === 'string' ? new Buffer(obj, 'base64') : obj.toString('base64');
    }

    return Base64;
});