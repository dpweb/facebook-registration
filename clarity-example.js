var settings = require('./settings.json');

var clarity = require('./clarity.js');

var fbreg = require('./fbreg.js')
(
	  settings.appid,  // clientid a.k.a. appid
      settings.secret,  // app secret
      settings.fields,  // fields
      settings.domain,  // your website domain
      clarity  // app instance
);

fbreg.registered = function(o){
	// save to db, or whatever
	console.log(o);
}

clarity.get(/\//, function(r, s, n){
	s.end(fbreg.html);
})

clarity.listen(8080);