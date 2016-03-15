var koa   = require('koa');
var app   = koa();

//Solução que pensei
app.use(function* (next) {
  if(!this.request.is('application/json')) {
    return yield next;
  }
  this.body = { message: 'hi!' };
});

app.use(function* (next) {
  this.body = 'ok';
});

var port = process.argv[2];
app.listen(port);