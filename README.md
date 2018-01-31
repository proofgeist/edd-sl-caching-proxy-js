# EDDSL.js - connect to EDDSL proxy server
this JavaScript Library connects to the EDD caching proxy server that wraps our wordpress site.

## Install
add 

`EDDSL : 'git+https://git@github.com/geistinteractive/edd-sl-caching-proxy.git'
`

to package.json dependancies then

`npm install`
## Usage

```javascript
import EDDSL from 'EDDSL'
const edd = new EDDSL(proxyURL)

edd.login(username, password).then(result=>{
    // do something with result or not
})
//etc see Method documentation

```
## Authentication - eddsl.log()
Log in with Wordpress username (or email) and password. This async function will return with some data and store the token for later use.

NOTE! liceseXXX methods don't require being logged in as they are intended to be used with out auth

## Documentation
https://geistinteractive.github.io/edd-sl-caching-proxy-js/

## Github
https://github.com/geistinteractive/edd-sl-caching-proxy-js