var path = require('path');
var crypt = require('crypto');
var image = path.resolve(__dirname, 'kiss.jpg');
var image2 = path.resolve(__dirname, 'kiss2.jpg');

var v = '';
v = crypt.md5('Spikef');				// md5加密
console.log(v);
v = crypt.sha1('Spikef');			    // sha1加密
console.log(v);
v = crypt.crc32(image);			        // 文件crc32加密
console.log(v);
v = crypt.base64.encode('Spikef');		// base64字符串加密
console.log(v);
v = crypt.base64.decode('U3Bpa2Vm');	// base64字符串解密
console.log(v);
v = crypt.base64.enfile(image);			// 文件base64加密
console.log(v);
v = crypt.base64.defile(v, image2);		// 文件base64解密