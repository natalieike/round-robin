const db = require("../models");

// Defining methods for the userController
module.exports = {
/* Req = {
	firstName
	lastName
	streetAddress
	country - own table
	stateProvnice - own table
	city
	postalCode
	aboutMe - can be null
	interestsFandoms = [] - own table
	shippingPreferenceId (Assume Shipping Pref table already populated)
	fbUserId
	oAuthToken
}
*/
  create: function(req, res) {
    db.country.findOrCreate({
    	where: {
    		countryName: req.body.country
    	},
    	defaults: {
    		countryName: req.body.country
    	}
    }).spread(function(country, created){
    	db.stateProvince.findOrCreate({
    		where: {
    			stateProvinceName: req.body.stateProvince
    		},
    		defaults:{
    			stateProvinceName: req.body.stateProvince
    		}
    	}).spread(function(stateProvince, cr){
    		request = req.body;
    		db.user.create({
    			firstName: request.firstName,
    			lastName: request.lastName,
    			streetAddress: request.streetAddress,
    			city: request.city,
    			postalCode: request.postalCode,
    			aboutMe: request.aboutMe,
    			shippingPreferenceId: request.shippingPreferenceId,
    			fbUserId: request.fbUserId,
    			oAuthToken: request.oAuthToken,
    			stateProvinceId: stateProvince.id
    		}).then(function(user){
    			req.body.interestsFandoms.map(interest => {
    				db.interestsFandoms.findOrCreate({
    					where: {
    						description: interest
    					},
    					defaults: {
    						description: interest
    					}
    				}).spread(function(intFan, created){
    					db.interestsFandomsAssociations.create({
    						interestsFandomId: intFan.dataValues.id,
    						userId: user.id
    					});
    				});
    			});
					res.json(user);
    		});
    	});
    }).catch(err => res.json.err);
  },
  findAll: function(req, res){

  },
  findById: function(req, res){

  },
  update: function(req, res) {
    
  },
  remove: function(req, res) {

  }  
};