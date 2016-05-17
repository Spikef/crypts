var fs = require('fs');
var hashTable = getHashTable();

var crc32 = module.exports = function(filePath) {
    var crc = 0xFFFFFFFF;
    var bin = fs.readFileSync(filePath);
    var buf = typeof ActiveXObject === 'function' ? binToBuf(bin) : bin;

    for (var i=0; i<buf.length; i++){
        crc = ((crc >> 8) & 0x00FFFFFF) ^ hashTable[(crc & 0xFF) ^ buf[i]];
    }

    if (crc<0) {
        crc = -Number(crc) - 1;
    } else {
        crc = 4294967296 - crc - 1;
    }

    return crc.toString(16).toUpperCase();
};

function binToBuf(bin) {
    var buf = [];
    with (new ActiveXObject('Microsoft.XMLDOM').createElement('node')) {
        dataType = 'bin.hex';
        nodeTypedValue = bin;
        var hex = text;
        hex.replace(/../g, function($0) {
            buf.push(parseInt($0, 16));
        });
    }

    return buf;
}

function getHashTable() {
    var table = new Array(256);

    var i, j, k;

    for (i=0; i<256; i++) {
        k = i;

        for (j=0; j<8; j++) {
            if (k & 1){
                k = ((k >> 1) & 0x7FFFFFFF) ^ 0xEDB88320;
            }else{
                k = ((k >> 1) & 0x7FFFFFFF);
            }
        }

        table[i] = k;
    }

    return table;
}