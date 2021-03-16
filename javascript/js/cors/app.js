const http = require('http');

function query(req, name) {
    const value = req.url.match(new RegExp(`(\\?|&)${name}=([^&]*)($|&)`)) ? RegExp.$2 : '';
    return value;
}

http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');
    const callback = query(req, 'callback')
    res.end(`${callback}({name: "gongding"})`);
}).listen(3000);
