var http = require('http');
var express = require('express');
const app = express();
const server = http.createServer(app);
app.get('/*', (req, res) => {
    let path = req.url;
    if (req.url == "/") path = "/index.html";
    path = path.split("?")[0];
    path = __dirname+path;
    res.sendFile(path);
});
server.listen(80);