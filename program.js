var koa = require('koa');
var app = koa();

//Solução que pensei
app.use(function *(next) {
	if (this.path === '/') {
		this.body = 'hello koa';
	} else if (this.path === '/404') {
		this.body = 'page not found';
	} else if (this.path === '/500') {
		this.body = 'internal server error';
	}
});

//Solução recomendada:
app.use(function* (next) {
  if (this.path !== '/') {
    return yield next;
  }

  this.body = 'hello koa';
});

app.use(function* (next) {
  if (this.path !== '/404') {
    return yield next;
  }

  this.body = 'page not found';
});

app.use(function* (next) {
  if (this.path !== '/500') {
    return yield next;
  }

  this.body = 'internal server error';
});

var port = process.argv[2];
app.listen(port);