describe('UsersModel', function() {

  describe('#create()', function() {
    it('should check create function', function (done) {
      Users.create([
          {
            "googleId": 115159140015340880000,
            "firstName": "Eric",
            "lastName": "Volpert",
            "photo": "https://lh6.googleusercontent.com/-pu2yn0hfQbk/AAAAAAAAAAI/AAAAAAAAsxA/7K0fYS94XKw/photo.jpg?sz=50",
            "email": "ericvolp12@gmail.com",
          },
          {
            "googleId": 113606810655754160000,
            "firstName": "Eric",
            "lastName": "Volpert",
            "photo": "https://lh3.googleusercontent.com/-juK4d_3AL30/AAAAAAAAAAI/AAAAAAAAAAA/S-jruLtdUZQ/photo.jpg?sz=50",
            "email": "eric@volptech.com",
          },
          {
            "googleId": 112295243279313530000,
            "firstName": "Eric",
            "lastName": "Volpert",
            "photo": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",
            "email": "evolpert@uchicago.edu",
          }
        ]
      )
        .then(function(results) {
          results.should.be.an('array');
          results.should.have.length(3);
          done();
        })
        .catch(done);
    });
  });

  describe('#find()', function() {
    it('should check find function', function (done) {
      Users.find()
        .then(function(results) {
          // some tests
          results.should.be.an('array');
          results.should.have.length(3);
          done();
        })
        .catch(done);
    });
  });

  describe('#findOne()', function() {
    it('should check findOne function', function (done) {
      Users.findOne({googleId: 115159140015340880000})
        .then(function(results) {
          results.should.have.property('firstName');
          done();
        })
        .catch(done);
    });
  });

});
