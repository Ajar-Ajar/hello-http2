const marker = require('@ajar/marker');
const https = require('https');
const fs = require('fs');

const port = process.env.PORT || 443;

const options = {
    key: fs.readFileSync('./ssl/privateKey.key'),
    cert: fs.readFileSync('./ssl/certificate.crt')
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello HTTPS\n');
}).listen(port,()=> {
  marker.d(`HTTPS listening on https://localhost:${port}`)
});