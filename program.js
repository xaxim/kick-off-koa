var koa = require('koa');
var app = koa();
var parse = require('co-body');

//Solução que pensei
app.use(function* (next) {
	if(this.path !== '/' || this.method !== 'POST') {
		return yield next;
	}

	var body = yield parse(this);
	this.body = body.name.toUpperCase();
});

//Solução recomendada:
app.use(function* (next) {
  // only accept POST request
  if (this.method !== 'POST') return yield next;

  // max body size limit to `1kb`
  var body = yield parse(this, { limit: '1kb' });

  // if body.name not exist, respond `400`
  if (!body.name) this.throw(400, '.name required');

  this.body = body.name.toUpperCase();
});

var port = process.argv[2];
app.listen(port);