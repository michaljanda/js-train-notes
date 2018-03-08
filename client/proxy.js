let express = require('express');
let proxy = require('http-proxy');

let app = express();
let p = proxy.createProxyServer({ target: 'http://localhost:5000/' });

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
