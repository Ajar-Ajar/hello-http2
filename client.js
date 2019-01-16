const http2 = require('http2');

const client = http2.connect('https://localhost:443');

const req = client.request({
    ':path' : '/'
})
let str = ''
req.on('data',chunk => str += chunk)
req.on('error',err => console.dir(err))
req.on('end',()=> {
    console.log(`\n${str}`)
    client.close();
});
req.end();

