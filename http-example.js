
var fbreg = require('./fbreg.js')
(
	  '461567240538848',  // clientid a.k.a. appid
      'bf82215556750aeaf7af44d7e6757a55',  // app secret
      'name,birthday,email',  // fields
      'run-node.com'   // your website domain
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
