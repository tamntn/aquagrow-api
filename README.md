# AquaGrow API
[![Build Status](https://travis-ci.org/tamntn/aquagrow-api.svg?branch=master)](https://travis-ci.org/tamntn/aquagrow-api)

## To run in development environment
```
npm install
npm run start-dev
```

## Notes
### Testing
* Running asynchronous test tends to give an error while you run multiple tests for a certain route. Therefore, write synchronous code for multiple tests of one route instead.
* In test script:
    * ```--recursive``` makes Mocha run all test files in the test folder
    * ```--exit``` forces Mocha to exit after running all tests. This will prevent Travis CI to stall during builds, which leads to build failure. Reference [here](https://github.com/mochajs/mocha/issues/3044)
### High-level Steps to Implement JSON Web Tokens with Passport.js
* Create middleware for validating the token - ```config/passport-jwt.js```
* When the user signs in, create a signed token and returns it with the response
* Add ```passport.authenticate('jwt', { session: false })``` to any route that required protections

## References
* [Mongoose Schema Types](http://mongoosejs.com/docs/schematypes.html)
* [Mocha](https://mochajs.org/)
* [Chai](http://chaijs.com)
* [Travis-CI](https://docs.travis-ci.com)
* [Bcryptjs](https://www.npmjs.com/package/bcryptjs)
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
* [Passport-jwt](https://github.com/themikenicholson/passport-jwt)
* [Geocoding API](https://developers.google.com/maps/documentation/geocoding/start)
* [NodeJS Client Library for Google Maps API](https://github.com/googlemaps/google-maps-services-js)
* Storing config in the environment
    * [Reading - 12 Factor App](https://12factor.net/)
    * [Npm package - dotenv](https://www.npmjs.com/package/dotenv)
    * [Heroku configuration and config vars](https://devcenter.heroku.com/articles/config-vars#setting-up-config-vars-for-a-deployed-application)
