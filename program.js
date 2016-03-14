var koa = require('koa');
var app = koa();

app.use(function *(next) {
	this.body = 'hello koa';
});

var port = process.argv[2];
app.listen(port);