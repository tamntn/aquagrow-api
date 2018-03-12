# AquaGrow API
[![Build Status](https://travis-ci.org/tamntn/sp-api.svg?branch=master)](https://travis-ci.org/tamntn/sp-api)

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

## References
* [Mongoose Schema Types](http://mongoosejs.com/docs/schematypes.html)
* [Mocha](https://mochajs.org/)
* [Chai](http://chaijs.com)
* [Travis-CI](https://docs.travis-ci.com)
* [Bcryptjs](https://www.npmjs.com/package/bcryptjs)
* [Passport-jwt](https://github.com/themikenicholson/passport-jwt)

## High-level Steps to Implement JSON Web Tokens with Passport.js
* Create middleware for validating the token - ```config/passport-jwt.js```
* When the user signs in, create a signed token and returns it with the response
* Add ```passport.authenticate('jwt', { session: false })``` to any route that required protections