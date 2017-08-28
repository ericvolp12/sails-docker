let sails = require('sails');
let path = require('path');
let dotEnvPath = path.resolve('../.env');
require('dotenv').config({ path: dotEnvPath});
global.chai = require('chai');
global.should = chai.should();


before(function (done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(5000);

  sails.lift({
    hooks: {
      grunt: false
    },
    models: {
      connection: 'unitTestConnection',
      migrate: 'drop'
    },
    connections: {
      unitTestConnection: {
        adapter: 'sails-disk'
      }
    }
  }, function (err) {
    if (err) return done(err);
    // here you can load fixtures, etc.
    done(err, sails);
  });
});

after(function (done) {
  // here you can clear fixtures, etc.
  sails.lower(done);
});
