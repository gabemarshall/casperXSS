casperXSS v0.1.0
=========

DOM XSS scanner built with casperJS

Expected Usage
------

Example #1

`
casperjs xss.js --url='http://example.com?param1=vuln&param2=somevalue'
`

Example #2 - Using Cookies

`
casperjs xss.js --url='http://example.com?param1=vuln&param2=somevalue' --cookiejar=path/to/cookie
`


Install
------

1. Install [casperJS](http://docs.casperjs.org/en/latest/installation.html)
2. Clone this repo


Credit: Rsnake for the xss payloads