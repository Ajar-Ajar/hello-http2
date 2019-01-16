const marker = require('@ajar/marker');
const http = require('http');
const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();

const port = process.env.PORT || 80;
const ssl_port = process.env.SSL_PORT || 443;

const options = {
    key: fs.readFileSync('./ssl/privateKey.key'),
    cert: fs.readFileSync('./ssl/certificate.crt')
};

app.get('/', (req, res) => {
    res.writeHead(200);
    res.end('hello express\n');
})

http.createServer(app)
     .listen(port,()=>{
        marker.d(`HTTP listening on https://localhost:${port}`)
    });

https.createServer(options,app)
     .listen(ssl_port,()=> {
        marker.d(`HTTPS listening on https://localhost:${ssl_port}`)
    });