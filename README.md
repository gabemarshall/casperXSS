casperXSS v0.0.2
=========

DOM XSS scanner built with casperJS

Expected Usage
------

Example #1

`
casperjs xss.js --url="http://example.com" --param="vulnerable" 
`

Example Payload:

`
http://example.com/?vulnerable=%3cscript%3ealert(1)%3c%2fscript%3e
`

Example #2

```
casperjs xss.js --url="http://example.com" --string=#id=1&view=default'
```


Example Payload:

`
http://example.com/#id=1&view=default%27%3cscript%3ealert(1)%3c%2fscript%3e
`

Important
------

If you want to inject a " into your query string (i.e. to attempt a break out) you have to escape it, otherwise CasperXSS will have a meltdown ;)

Example #3

`
casperjs xss.js --url="http://example.com" --string="#id=1&view=default\""
`

Example Payload:

`
http://example.com/#id=1&view=default%22%3cscript%3ealert(1)%3c%2fscript%3e
`

Install
------

1. Install [casperJS](http://docs.casperjs.org/en/latest/installation.html)
2. Clone this repo 

Credit: Rsnake for the xss payloads