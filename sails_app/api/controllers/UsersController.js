/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	cachedLookup: function(req, res){
	  CachedLookupService.findUser(req.params.id).then((record) => {
      res.json(200, record);
    }, (error) => {
      sails.log("Rejected: %j", error);
      res.serverError(error);
    });
  }
};

