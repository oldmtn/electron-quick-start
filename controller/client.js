const http = require('http');
const url = require('url');
const fs = require('fs');
const querystring = require("querystring");


let port = 16200;



function buildHttpRequest(cmdType) {
    console.log('+buildHttpRequest, cmdType: ', cmdType);
    let postData = querystring.stringify({
        'msg': 'hello-world'
    });

    let options = {
        hostname: '127.0.0.1',
        port: port,
        path: '/cmd?type=123',
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    };
    options.path = '/cmd?type=' + cmdType;
    console.log('options.path: ', options.path);

    const req = http.request(options, (res) => {
        console.log(`状态码: ${res.statusCode}`);
        console.log(`响应头: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(`响应主体: ${chunk}`);
        });
        res.on('end', () => {
            console.log('响应中已无数据');
        });
    });

    req.on('error', (e) => {
        console.error(`请求遇到问题: ${e.message}`);
    });

    // 将数据写入请求主体。
    req.write(postData);
    req.end();
}

process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);

    if (index === 2) {
        buildHttpRequest(val);
    }
});