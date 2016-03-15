var koa = require('koa');

var app = koa();

app.keys = ['secret', 'keys']

app.use(function* () {
	var n = ~~this.cookies.get('view', { signed: true}) + 1;
	this.body = n + ' views';
	this.cookies.set('view', n, {signed: true})
});

app.listen(process.argv[2]);