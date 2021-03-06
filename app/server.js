const http = require('http');
const url = require('url');
const fs = require('fs');

let omServer;
let omCb;
let port = 16200;

function onRequest(req, res) {
    var urldata = url.parse(req.url, true),
        pathname = urldata.pathname;
    var info = { 'res': res, 'query': urldata.query, 'postData': '' };
    // console.log('req.url: ', req.url);
    // console.log('pathname: ', pathname);
    // console.log('urldata: ', urldata.query);
    console.log('query.type: ', urldata.query.type);

    req.setEncoding('utf8');
    req.addListener('data', function (postDataChunk) {
        info.postData += postDataChunk;
    });
    req.addListener('end', function () {
        // console.log('postData: ', info.postData);

        if (pathname === '/cmd') {
            if (urldata && urldata.query) {
                let data = '';

                omCb({ type: urldata.query.type });

                data = urldata.query.type + '_ok';

                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.write(data);
                res.end();
            }
        }
    });
}


function startServer(cb) {
    omCb = cb;
    omServer = http.createServer({}, onRequest);
    omServer.listen(port);
}

function stopServer() {
    omServer.stopServer();
}

module.exports = {
    startServer: startServer,
    stopServer: stopServer
}


// main
// startServer((msg) => {
//     console.log('msg: ', msg);
// });
