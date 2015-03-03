// var http = require('http');
// var querystring = require('querystring');

// var postData = {
//   email: 'schmidtaeric@gmail.com',
//   username: 'eds1201',
//   password: 'pass'
// };

// var options = {
//   hostname: 'localhost',
//   port: 3000,
//   path: 'api/users/signup',
//   method: 'POST',
// };

// var req = http.request(options, function(res) {
//   console.log('STATUS: ' + res.statusCode);
//   console.log('HEADERS: ' + JSON.stringify(res.headers));
//   // res.setEncoding('utf8');
//   res.on('data', function (chunk) {
//     console.log('BODY: ' + chunk);
//   });
// });

// req.on('error', function(e) {
//   console.log('problem with request: ' + e.message);
// });

// // write data to request body
// console.log(querystring.stringify(postData));
// req.write(querystring.stringify(postData));
// req.end()