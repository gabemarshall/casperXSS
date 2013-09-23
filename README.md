casperXSS v0.0.2 by Gabe Marshall
=========

Reflective/DOM XSS scanner built on casperJS

Expected Usage
------

Example #1

`
casperjs xss.js --url="http://example.com" --param="vulnerable" 
`

Example Result:

`
http://example.com/?vulnerable=%3cscript%3ealert(1)%3c%2fscript%3e
`

Example #2

```
casperjs xss.js --url="http://example.com" --string=#id=1&view=default'
```


Example Result:

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

Example Result:

`
http://example.com/#id=1&view=default%22%3cscript%3ealert(1)%3c%2fscript%3e
`

Credit: Rsnake for the xss payloads