var koa   = require('koa');
var parse = require('co-body');
var fs    = require('fs');
var app   = koa();

//Solução que pensei
app.use(function* (next) {
  if(this.path !== '/json') {
    return yield next;
  }
  this.body = { foo: 'bar' };
});

app.use(function* (next) {
  if(this.path !== '/stream') {
    return yield next;
  }
  this.body = fs.createReadStream(process.argv[3]);
});

var port = process.argv[2];
app.listen(port);