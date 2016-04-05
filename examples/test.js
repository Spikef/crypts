//var c = require('crypto');
//var byts = c.randomBytes(4);
//console.log(byts.toString('hex'));
//
//var r = require('crypts/lib/random');
//var a = r.randomBytes(4);
//console.log(new Buffer(a).toString('hex'));

//
var b = require('crypts/lib/bcrypt');
var v = b.hashSync('bacon', 6);
console.log(v);

var r = b.compareSync('bacon', '$2a$06$YCZi3NX.Cf.eAv4ofQQd3OEQlzzGCsCiorKfM7Mvn1ti1MkHRtVyC');
console.log(process.uptime())
console.log(r);
//
//var salt = '124gft';
//var pass = 'sfdsf@3dfgg';
//var sha256 = require('crypts/lib/sha256');
//var v = sha256(pass + salt);
//console.log(process.uptime())