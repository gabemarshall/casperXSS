var casper = require('casper').create({
	logLevel: 'warning',
	verbose: true,
	onAlert: function(msg) {
		//msg = msg.replace(/\[object Casper\]/g,"");

		tempMessage = 'XSS verified ' + msg + '';
		var vulnWarning = tempMessage.replace(/\[object Casper\]/g,"");
		casper.log(vulnWarning);
		vulns.push(vulnWarning);

	},
	XSSAuditingEnabled: false
});

var fs = require('fs');
var utils = require('utils');
var data = fs.read('rsnake.txt');
var xss = data.toString().split("\n");
var uri;
var payloads = [];

var params = casper.cli.get("param");
var cookieFile = casper.cli.get("cookies");
var url = casper.cli.get("url");
var string = casper.cli.raw.get("string");
var vulns = [];
var count;

if (cookieFile) {
	var filedata = fs.read(cookieFile);
	var jsonCookies = JSON.parse(filedata);

	for (i = 0; i < jsonCookies.length; i++) {
		console.log("adding cookie")
		phantom.addCookie({
			'name': jsonCookies[i].name,
			'value': jsonCookies[i].value,
			'domain': jsonCookies[i].domain,
			'hostOnly': jsonCookies[i].hostOnly,
			'secure': jsonCookies[i].secure,
			'session': jsonCookies[i].session,
			'storeId': jsonCookies[i].storeId,
			'httpOnly': jsonCookies[i].httpOnly
		})
	}
}



if (casper.cli.has("param") !== false) {
	console.log('heyo')
	uri = url + '?' + params + '=';
} 
else if (casper.cli.has("string")){
	uri = url + '/' + string;
}
else {
	uri = url + '/';
}

if (!url) {
	console.log('URL is missing, please try again Ex: casperjs xss.js --url=example.com --param=example')
	casper.exit();
}

console.log('\nTrying ' + xss.length + ' payloads on the \'' + params + '\' parameter. \nSit back and enjoy the ride.\n');

// add regex to clean up xss validation msg (\[object Casper\], currently at)


for (z = 0; z < xss.length; z++) {
	payloads.push(uri + xss[z] + '');
}

casper.start(url, function(status) {


});
casper.run()



casper.then(function() {
	// temporarily registering listener
});

function test(url, count, total) {

	casper.thenOpen(url, function(status) {

		//Page is loaded!
		console.log('Current Payload: ' + url);

		if (count === total - 1) {


			casper.echo('Scan Completed!', 'INFO');
			console.log(vulns.length + ' payloads succeeded:\n');

			if (vulns) {

				for (i = 0; i < vulns.length; i++) {
					casper.echo('Verified XSS:', 'ERROR');
					console.log(vulns[i] + '\n');

				}
			}

		}

	});

}

for (i = 0; i < payloads.length; i++) {

	test(payloads[i], i, payloads.length);
}