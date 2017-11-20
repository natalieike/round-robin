const db = require("../models");

// Defining methods for the eventController
module.exports = {
/*
	Req = {
		eventName
		userId
		organizerAKA = can be NULL
		categoryId (from categories table - pre-sets)
		matchOptionId (from matchOptions table - pre-sets)
		aboutEvent = can be NULL
		signupDeadline = can be NULL
		shipDealine = can be NULL
		isPrivate
	}
	1 - Set statusId to the ID for "Signup" when event is created (should be pre-populated in status table)
	2 - Create new Event
	3 - Create eventAssociation for moderator (IE - they are automatically a participant in their own exchange)
	4 - Res.json while eventAssociation is happening
*/	
  create: function(req, res) {
    db.status.findOne({
    	where: {
    		statusName: "Signup"
    	}
    }).then(status => {
    	var request = req.body;
    	request.statusId = status.id;
    	db.event.create(request)
    	.then(result => {
    		db.eventAssociations.create({
    			eventId: result.id,
    			userId: request.userId,
    			packageRecd: false
    		});
    		res.json(result)
    	});
    }).catch(err => {res.json(err)});
  },
  findAll: function(req, res){

  },
  findById: function(req, res){

  },
//Req.params has 2 parameters - option and value
  findByOption: function(req, res){

  },
  update: function(req, res) {
    
  },
  remove: function(req, res) {

  },  
  match: function(req, res){

  },
  findAllCategories: function(req, res){

  },
  findAllMatchOptions: function(req, res){

  },

};