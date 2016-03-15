var koa = require('koa');
    
var app = koa();

app.use(responseTime());
app.use(upperCase());

app.use(function* () {
  this.body = 'hello koa';
});

function responseTime() {
  return function* (next) {
    var startTime = new Date();
    yield next;
    var timeTaken = new Date() - startTime;
    this.set('X-Response-Time', timeTaken);
    // set X-Response-Time head
  };
}

function upperCase() {
  return function* (next) {
    // do nothing
    yield next;
    this.body = this.body.toUpperCase();
  };
}

app.listen(process.argv[2]);