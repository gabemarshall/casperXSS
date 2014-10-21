var casper = require('casper').create({
    logLevel: 'warning',
    verbose: true,
    onAlert: function(msg) {

        Message = 'XSS verified ' + msg + '';
        var vulnWarning = Message.replace(/\[object Casper\]/g, "");
        casper.log(vulnWarning);
        vulns.push(vulnWarning);

    },
    XSSAuditingEnabled: false
});

casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X)');

var fs = require('fs');
var utils = require('utils');
var data = fs.read('rsnake.txt');
var xss = data.toString().split("\n");

var checks = ["sUshI"]

var fullChecks = false
var stringFoundInResponse = false

var payloads = [];
var cookieCli = casper.cli.get("cookie");
var url = casper.cli.get("url");
var url_backup = casper.cli.get(1);
if (!url){
	url = url_backup
}
var string = casper.cli.raw.get("string");
var params = []
var detectedParameters;
var vulns = [];
var intro = fs.read('intro.txt');
var count;

try {
    var uri = url.split('?');
    var queryString = uri[1];
    var uri = uri[0];

} catch (err) {

}

var storedParamValues


var casperXSS = {
    analyze: function() {

        var setParameters = function(setpayloads) {
            for (i = 0; i < params.length; i++) {
                console.log("Detected the \"" + params[i] + "\" parameter, adding it into scope.");
            }
            setpayloads()
        }

        //setParameters(this.setPayloads);
        setParameters(this.prelimCheck)
    },
    prelimCheck: function(){
        for (z = 0; z < params.length; z++) {
           

            for (x = 0; x < checks.length; x++) {
  
                    var payloadString = uri + '?' + params[z] + '=' + checks[x]
                    for (y = 0; y < params.length; y++) {
                    	if(y != z){
                    		payloadString += '&' + storedParamValues[y]
                    	}
                        
                    }
                    payloads.push(payloadString);
                

            }
        }

        casperXSS.scan()
    },
    setPayloads: function() {

        for (z = 0; z < params.length; z++) {
           

            for (x = 0; x < xss.length; x++) {
  
                    var payloadString = uri + '?' + params[z] + '=' + xss[x]
                    for (y = 0; y < params.length; y++) {
                    	if(y != z){
                    		payloadString += '&' + storedParamValues[y]
                    	}
                        
                    }
                    payloads.push(payloadString);
                

            }
        }

        casperXSS.scan()

    },
    detectParameters: function(url, analyze) {


        storedParamValues = queryString.split('&')
        detectedParameters = queryString.split('&');

        for (i = 0; i < detectedParameters.length; i++) {
            tempParam = detectedParameters[i].replace(/(=.*)/i, "");
            params.push(tempParam);
        }

        analyze();

    },
    scan: function() {
        console.log('\nTrying ' + payloads.length + ' payloads on a total of ' + params.length + ' parameter. \nSit back and enjoy the ride.\n');

        // add regex to clean up xss validation msg (\[object Casper\], currently at)


        casper.start(url, function(status) {


        });
        casper.run()



        casper.then(function() {
            // temporarily registering listener
        });

        function testPayload(url, count, total) {

            casper.thenOpen(url, function(status) {
		    var js = this.evaluate(function() {
				return document; 
			});

            console.log('Trying => ' + url);
			
            if (js.all[0].outerHTML.search(checks[0]) === -1){
				this.echo("Value was not found in the DOM or Response...\n")
			}
			else {
				this.echo("Value was reflected in either the DOM or Response..")
				stringFoundInResponse = true
			}	
                

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

            testPayload(payloads[i], i, payloads.length);
        }
    }
}

if (cookieCli) {
    cookies = cookieCli.split(";")
    for (i = 0; i < cookies.length; i++) {
        cookie = cookies[i].trim("")
        if (cookie){
            cookie = cookie.split("=")
            name = cookie[0]
            value = cookie[1]
            phantom.addCookie({
                'name': name,
                'value': value,
                'path':'/'
            })
        }
    }
}


if (!url) {
    console.log('\n' + intro)
    console.log('\nA valid URL is missing, please try again Ex: casperjs xss.js -u \"http://example.com?param1=vuln&param2=somevalue\"')
    console.log('Currently casperXSS only supports GET requests and parameters within the query string...more to come');
    console.log('\nIf your scan needs to be authenticated, currently you can import cookies via the --cookie option (similar to SQLmap)');
    console.log('(Chrome extension \"Edit This Cookie\" works great at exporting to JSON)');
    console.log('\ncasperXSS v0.1.0')
    casper.exit();
} else {
    casperXSS.detectParameters(url, function() {
        casperXSS.analyze();
    });
}
