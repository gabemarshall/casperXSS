var casper = require('casper').create({
	logLevel: 'warning',
	verbose: true,
	onAlert: function(msg){
		tempMessage = 'XSS verified '+msg+'';
		casper.log('XSS verified '+msg, 'warning');
		vulns.push(tempMessage);

	},
	XSSAuditingEnabled: false
});

var fs = require('fs');
var utils = require('utils');
var data = fs.read('rsnake.txt');
var xss = data.toString().split("\n");
var payloads = [];

var params = casper.cli.get("param");
var url = casper.cli.get("url");
var vulns = [];
var count;

if (!params){
	console.log('Welcome to CasperXSS\nExample usage: casperjs xss.js --url=example.com --param=example ')
	casper.exit();
}

if(params && !url){
	console.log('URL is missing, please try again Ex: casperjs xss.js --url=example.com --param=example')
	casper.exit();
}

console.log('\nTrying '+xss.length+' payloads on the \''+params+'\' parameter. \nSit back and enjoy the ride.\n');

// add regex to clean up xss validation msg (\[object Casper\], currently at)


	for (z = 0; z < xss.length; z++) {
		payloads.push(url+'?' + params + '=' + xss[z] + '');
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
		console.log('Current Payload: '+url);

		if(count === total -1){
			
			console.log('Scan Completed!');
			console.log(vulns.length+' payloads succeeded');

			if(vulns){
			console.log(vulns[0])
			}
			
		}

	});

}

for (i = 0; i < payloads.length; i++) {
	
		test(payloads[i], i, payloads.length);
}

