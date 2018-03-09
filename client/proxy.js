let express = require('express');
let proxy = require('http-proxy');
let fs = require('fs');
let targetDir = './dev'; 


let app = express();
let p = proxy.createProxyServer({ target: 'http://localhost:5000/' });
p.on('error', function (e) {
  //gulp reload -> browser cancels requests -> proxy gets error (ECONNRESET)
  //unhandled error means process shutdown
  //in case of heavy traffic (charting) this is very common
  if (e.code === 'ECONNRESET') {
      console.log('[API-PROXY] Connection reset - expected');
  }
});

app.all('/api/*', function(req, res) {
  p.web(req, res);
});

app.get('/', function(req, res) {
  fs.readFile(targetDir + '/index.html', 'utf-8', function(err, jsp) {
    res.set('Content-Type', 'text/html; charset=utf-8');
    res.end(jsp.replace(/<%[\s\S]*?%>/g, ''));
  });
});

app.listen(3000);
app.use('/bower_components', express.static('./bower_components'));
app.use(express.static('./dev'));
