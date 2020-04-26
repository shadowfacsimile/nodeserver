const querystring = require('querystring');

let res = 'fname=prasil&lname=prakash';

let parsed = querystring.parse(res);
console.log(parsed);