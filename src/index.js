var express = require('express');
var app = express();
var port = 3000;
app.get('/', function (_req, res) {
    res.send('Hello World!');
});
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
