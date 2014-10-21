casperXSS v0.1.1
=========

DOM XSS scanner built with casperJS

Expected Usage
------

Example #1

`
casperjs xss.js --url='http://example.com?param1=vuln&param2=somevalue'
`

Example #2 - Using Cookie jar (JSON format)

`
casperjs xss.js --url='http://example.com?param1=vuln&param2=somevalue' --cookiejar=path/to/cookiejar
`


Install
------

1. Install [casperJS](http://docs.casperjs.org/en/latest/installation.html)
2. Clone this repo


Credit: Rsnake for the xss payloads
