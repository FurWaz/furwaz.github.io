var http = require('http');
var fs = require('fs');
/**@type {http.Server} */
var server = http.createServer( (req, res) => {
    if (req.url.startsWith("/index.html")) {
        res.end(fs.readFileSync("./index.html"));
        return
    }
    res.end(fs.readFileSync("."+req.url))
});
server.listen(8080);