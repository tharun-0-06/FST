var fs = require('fs');
var http = require('http');
var url = require('url');
var ROOT_DIR = "/home/fullstacklab/Desktop/FST/week7";
http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true, false);
    fs.readFile(ROOT_DIR + urlObj.pathname, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
}).listen(8082);

var http = require('http');
var options = {
    hostname: 'localhost',
    port: '8082',
    path: '/index.html'
};
function handleResponse(response) {
    var serverData = '';
    response.on('data', function (chunk) {
        serverData += chunk;
    });
    response.on('end', function () {
        console.log(serverData);
    });
} http.request(options, function (response) {
    handleResponse(response);
}).end();
