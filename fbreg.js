
function b64decode(s){
    return new Buffer(s, 'base64').toString('ascii');
}

function fbreg(signed_request, secret) {
    var enc_data = signed_request.split('.', 2),
    sig = enc_data[0],
    json = b64decode(enc_data[1]),
    data = JSON.parse(json);

    if (!data.algorithm || data.algorithm.toUpperCase() != 'HMAC-SHA256') {
        console.error('Unknown algorithm. Expected HMAC-SHA256');
        return null;
    }
 
    expected_sig = require('crypto')
        .createHmac('sha256',secret)
        .update(enc_data[1]).digest('base64').replace(/\+/g,'-')
        .replace(/\//g,'_')
        .replace('=','');
    
    if (sig !== expected_sig) {
        console.error('Bad signed JSON Signature!');
        return null;
    }
 
    return data;
}

var debug = process.env.debug;

module.exports = function(appid, appsecret, fields, host, app, redir){
    fields = fields || 'name,birthday,email';
    var o = {
        registered: function(){},
        process: function(r, s){
            var decoded = fbreg(r.body.signed_request, appsecret);
            o.registered(decoded);
            redir = redir || '/';
            s.writeHead(302, { 'Location': redir });
            s.end();
        },
        html: '<iframe frameborder=0 height=340 src="https://www.facebook.com/plugins/registration.php?'+
            'client_id='+appid+'&redirect_uri=http://'+host+'/fbreg&fields='+fields+'"></iframe>'
    }
    if(!app) return o;

    app.post(/fbreg/, o.process);
    return o;
}
