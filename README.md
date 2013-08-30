facebook-registration
=====================

The FB registration form can be very useful for your website.  It's a widget pre-filled with someone's info (assuming they are carring a FB cookie, which many many people are).    
    
With one click, their info including email can be captured by your site.  This module makes integration easy for NodeJS web servers, including Express and Clarity.

You set up an app in Facebook and obtain a key and secret.  More here..
https://developers.facebook.com/docs/plugins/registration/

###Express
````
var express = require('express');
var app = express();

app.use(express.bodyParser());

var fbreg = require('./fbreg.js')
(
	  '...',  // clientid a.k.a. appid
      '...',  // app secret
      'name,birthday,email',  // fields
      'yourdomain.com',  // your website domain
      app  		// your app object
);

fbreg.registered = function(o){
	// save to db, or whatever
	console.log(o);
}

app.get('/', function(r, s){
	s.setHeader('Content-Type', 'text/html');
	console.log(fbreg.html);
})

app.listen(8080);
````

###Clarity
Clarity is a light NodeJS based web server, which allows for req/res pipelining similar to Express or Connect.  

````
var clarity = require('./clarity.js');

var fbreg = require('./fbreg.js')
(
	  '...',  // clientid a.k.a. appid
      '...',  // app secret
      'name,birthday,email',  // fields
      'yourdomain.com'   // your website domain
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
````

###Examples
Examples are included.  Register your app in FB, then set up a settings.json file like this to run them.

settings.json
````
module.exports = {

	  appid: '...',
      secret: '...',
      fields: 'name,birthday,email',
      domain: 'yourdomain.com'

}
````