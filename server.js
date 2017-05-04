var express = require('express');
var server = express();

var config = require('./conf');

server.use(express.static(__dirname));

server.get('*', (_, res) => {
  res.sendFile('index.html', {root: __dirname});
});

server.listen(config.port, (err) => {
  console.log(err || `Listening on port ${port}`);
});
