const marker = require('@ajar/marker');
const http2 = require('http2');
const fs = require('fs');

const ssl_port = process.env.PORT || 443;

const onRequest = (req,res)=>{
  console.log('req.url',req.url)
  if(req.url == '/random'){
    let count = 0;
    const id = setInterval(()=> {
       count++;
       res.stream.pushStream()
    },500);
  }
}
const server = http2.createSecureServer({
  key: fs.readFileSync('./ssl/privateKey.key'),
  cert: fs.readFileSync('./ssl/certificate.crt')
});

server.on('error', (err) => console.error(err));

server.on('stream', (stream, headers) => {
  // console.log('stream',stream)
  // stream is a Duplex
  stream.respond({
    'content-type': 'text/html',
    ':status': 200
  });
  stream.end('<h1>Hello http2</h1>');
});

server.listen(ssl_port,()=>{
  marker.d(`listening on https://localhost:${ssl_port}`)
});