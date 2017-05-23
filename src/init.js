/**
 * app-init.js : Application init script, that will be invoked at the time of application startup.
 * @author raja
 * Created on 22-05-2016 15:36.
 */
"use strict"

var logger = require('./utils/logger');

/**
 * Init function is can be invoked at the time of application startup
 * -> This will do various startup tasks like verifying the database etc.
 */
var initScript = function (app) {
  logger.silly("Initializing application");
  // require('./routes/init')(app);
};



var model = require('nodejs-model');

//create a new model definition _User_ and define _name_/_password_ attributes
var User = model("User").attr('name', {
  validations: {
    presence: {
      message: 'Name is required!'
    }
  }
}).attr('password', {
  validations: {
    length: {
      minimum: 5,
      maximum: 20,
      messages: {
        tooShort: 'password is too short!',
        tooLong: 'password is too long!'
      }
    }
  },
  //this tags the accessibility as _private_
  tags: ['private']
});

var u1 = User.create();
//getters are generated automatically
u1.name('foo');
u1.password('password');

console.log(u1.name());
//prints _foo_

//Invoke validations and wait for the validations to fulfill
u1.validate(function() {
  if (u1.isValid) {
    //validated, perform business logic
  } else {
    //validation failed, dump validation errors to the console
    console.log(p1.errors)
  }
});

//get object as a plain object, ready for JSON
console.log(u1.toJSON());
//produces: { name: 'foo' }

//now also with attributes that were tagged with 'private'
console.log(u1.toJSON('private'));
//produces: { name: 'foo' } { password: 'password' }


var U = require("./model/user");


var u = U.create();

u._id("123");
u.email("raja@gmail.com");
console.log(u.toJSON("*"));

/**
 *
 * @type {initScript}
 */
module.exports = initScript;
