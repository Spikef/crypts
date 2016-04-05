# crypts #

crypts模块集成一些常用的加密解密算法，包括：base64、md5、sha1、sha256、crc32、DES等。

同时兼容NodeAsp和node。

## 使用示例 ##

代码示例:

``` javascript
var path = require('path');
var crypts = require('crypts');
var plain = path.resolve(__dirname, 'test.txt');
var image = path.resolve(__dirname, 'kiss.jpg');
var image2 = path.resolve(__dirname, 'kiss2.jpg');

var v = '';
v = crypts.md5('Spikef');				    // md5加密
console.log(v);
// =>  2966c8436b567beffed63d6b56b15b0f
v = crypts.sha1('Spikef');			        // sha1加密
console.log(v);
// =>  48959ac28700f58ee721b93539fd1bb18a101a3f
v = crypts.sha256('Spikef');			    // sha256加密
console.log(v);
// =>  48959ac28700f58ee721b93539fd1bb18a101a3f
v = crypts.crc32(image);			        // 文件crc32加密
console.log(v);
// =>  43E2B211
v = crypts.base64.encode('Spikef');		    // base64字符串加密
console.log(v);
// =>  U3Bpa2Vm
v = crypts.base64.decode('U3Bpa2Vm');	    // base64字符串解密
// => Spikef
console.log(v);
v = crypts.base64.enfile(plain);			// 文件base64加密
console.log(v);
// => Kg==
v = crypts.base64.enfile(image);			// 文件base64加密
v = crypts.base64.defile(v, image2);		// 文件base64解密
```