var express = require('express');
var server = express();

const port = 8080;

server.use(express.static(__dirname));

server.get('*', (_, res) => {
  res.sendFile('index.html', {root: __dirname});
});

server.listen(port, (err) => {
  console.log(err || `Listening on port ${port}`);
});
