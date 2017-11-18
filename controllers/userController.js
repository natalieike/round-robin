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
	shippingPreferenceId (Assume Shipping Pref table already populated - UI should pull both ID and Description for dropdown, and return the ID)
	fbUserId
	oAuthToken
}
Create does these things:
	1 - Find or Create Country
	2 - Find or Create State/Province (requires Country)
	3 - Create User (requires State/Province)
	4 - loop thru insterestsFandoms array and Find or Create each Fandom
		-	In this loop, once the Fandom is found/created, then Create an entry in the interestsFandomsAssociations table for this user/fandom combination
	5 - While the interestsFandoms are being saved (because it's sort of irrelevant to the UI), send JSON of the User
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
    			stateProvinceName: req.body.stateProvince,
    			countryId: country.dataValues.id
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
//Finds All active users (isActive = true), with Full Addresses and Shipping Preferences
  findAll: function(req, res){
  	db.user.findAll({
  		where: {
  			isActive: true
  		},
  		include: [{
        model: db.stateProvince,
	      attributes: ['stateProvinceName', 'countryId'],
	      include: [{
	          model: db.country,
	          attributes: ['countryName']
  		}]}, 
  		{
  			model: db.shippingPreferences,
  			attributes: ['id', 'preference']
  		}],
  		order: [['lastName', 'ASC'], ['firstName', 'ASC']]
  	}).then(users => {
  		res.json(users);
  	}).catch(err => res.json(err))
  },
//Finds User by User Id - includes Full Address and Shipping Preferences
  findById: function(req, res){

  },
//Finds a user's interests/fandoms by User Id
  findUsersInterestsFandoms: function(req, res){

  },
//Update a user's data by User ID
  update: function(req, res) {
    
  },
//De-activate a user (set isActive = false - do not actually delete from database)
  remove: function(req, res) {

  }  
};