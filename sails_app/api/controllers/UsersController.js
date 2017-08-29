/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  cachedLookup: function (req, res) {
    CachedLookupService.findUser(req.params.id).then((record) => {
      return res.json(200, record);
    }, (error) => {
      sails.log("Rejected: %j", error);
      return res.serverError(error);
    });
  },

  sessionTest: function (req, res) {
    res.json(200, req.session);
  },

  home: function (req, res) {
    Users.find().then(function (users) {
      res.view('homepage', {
        user: req.session.user ? req.session.user : null,
        loggedOut: req.query.loggedOut,
        users: users
      });
    });
  }
};

