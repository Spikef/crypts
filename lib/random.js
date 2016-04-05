var MT = require('./MersenneTwister');
var mt = new MT();
var seedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

exports.randomBytes = function(len) {
    var bytes = [], b;
    for (var i=0; i<len; i++) {
        b = random(255);
        bytes.push(b);
    }

    return bytes;
};

exports.randomChars = function(len, seed) {
    seed = seed || seedChars;
    var chars = [], index, count = seed.length - 1;
    for (var i=0; i<len; i++) {
        index = random(count);
        chars.push(seed.charAt(index));
    }

    return chars.join('');
};

exports.randomInt = function(min, max) {
    return random(max, min);
}

/**
 * 生成[min, max]范围内的随机整数
 * @param max: 最大值
 * @param min: 最小值
 * @returns {Number}
 */
function random(max, min) {
    if (typeof max !== 'number') max = 255;
    if (typeof min !== 'number') min = 0;

    max = max - min;

    return Math.round(mt.random() * max + min);
}