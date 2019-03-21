var express = require('express')
var path = require('path')
var ejs = require('ejs')
var date = require('./util/date')

var app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use('/assets', express.static('assets'))

app.get('/', function(req, res) {
  res.render('index')
})

var server = app.listen(8081, function() {
  var port = server.address().port
  // console.log('访问地址为 http://localhost:' + port)
})
