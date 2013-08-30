
var settings = require('./settings.json');

var express = require('express');
var app = express();

app.use(express.bodyParser());

var fbreg = require('./fbreg.js')
(
	  settings.appid,  // clientid a.k.a. appid
      settings.secret,  // app secret
      settings.fields,  // fields
      settings.domain,  // your website domain
      app  		// express app instance
);

fbreg.registered = function(o){
	// save to db, or whatever
	console.log(o);
}

app.get('/', function(r, s){
	s.setHeader('Content-Type', 'text/html');
	s.end(fbreg.html);
})

app.listen(80);
