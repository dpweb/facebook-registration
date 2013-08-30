
var settings = require('./settings.json');

var fbreg = require('./fbreg.js')
(
    appid: settings.appid,
    secret: settings.secret,
    
);

fbreg.registered = function(o){
	// save to db, or whatever
	console.log(o);
}

require('http').createServer(function(r, s){
	if(r.url.match(/\//)){
		s.end(fbreg.html);
	}

	if(r.url.match(/fbreg/)){
		fbreg.
	}	
}).listen(8080);
