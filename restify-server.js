const marker = require('@ajar/marker');
const restify = require('restify');
const fs = require('fs');

const port = process.env.PORT || 3000;
const ssl_port = process.env.PORT || 443;


const server = restify.createServer({
    http2:{
        key: fs.readFileSync('./ssl/privateKey.key'),
        cert: fs.readFileSync('./ssl/certificate.crt')
    }
});

server.get('/hello/:name', (req, res, next)=> {
  res.header('content-type', 'json');
  res.send({ name : req.params.name});
  next();
});


server.listen(ssl_port, ()=> {
    marker.d(`${server.name} listening at https://localhost:${ssl_port}`)
});