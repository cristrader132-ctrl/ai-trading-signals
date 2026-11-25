const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;
const root = __dirname;
const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  if (pathname === '/api/status') {
    res.writeHead(200, {'Content-Type':'application/json'});
    return res.end(JSON.stringify({status:'demo', connected:false, message:'Prototipo: sin conexión a cotizaciones OTC reales ni a IQ Option.'}));
  }
  const file = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const full = path.resolve(root, file);
  if (!full.startsWith(root) || !fs.existsSync(full) || fs.statSync(full).isDirectory()) {
    res.writeHead(404); return res.end('Not found');
  }
  const ext = path.extname(full);
  const types = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript'};
  res.writeHead(200, {'Content-Type':types[ext] || 'application/octet-stream'});
  fs.createReadStream(full).pipe(res);
});
server.listen(PORT, '0.0.0.0', () => console.log(`AI Trading Signals running on ${PORT}`));
