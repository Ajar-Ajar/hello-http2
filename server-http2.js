const http2 = require('http2');
const fs = require('fs');
const marker = require('@ajar/marker');
const port = process.env.PORT || 80;


const server = http2.createServer( (req,res)=>{
    console.log('req.url',req.url)
    if(req.url == '/random'){
      let count = 0;
      const id = setInterval(()=> {
         count++;
         res.stream.pushStream()
      },500);
    }
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

server.listen(port,()=> {
    marker.d(`HTTP2 listening on http://localhost:${port}`)
});