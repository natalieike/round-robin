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
    	}).catch(error => {res.json(err)});
    }).catch(err => {res.json(err)});
  },
//Finds All Active Events
  findAll: function(req, res){
  	db.event.findAll({
  		where: {
  			isActive: true
  		},
  		include: [{
  			model: db.categories,
	      attributes: ['id', 'categoryName']
  		}, {
  			model: db.matchOptions,
	      attributes: ['id', 'matchDescription']
  		}, {
  			model: db.status,
  			attributes: ['id', 'statusName']
  		},{
  			model: db.user,
  			attributes: ['id', 'firstName', 'lastName']
  		}]
  	}).then(data => {res.json(data)})
  	.catch(err => {res.json(err)});
  },
//Finds the one active event by ID
  findById: function(req, res){
  	db.event.findOne({
  		where: {
  			id: req.params.id,
  			isActive: true
  		},
  		include: [{
  			model: db.categories,
	      attributes: ['id', 'categoryName'],
  		}, {
  			model: db.matchOptions,
	      attributes: ['id', 'matchDescription'],
  		}, {
  			model: db.status,
  			attributes: ['id', 'statusName']
  		}, {
  			model: db.user,
  			attributes: ['id', 'firstName', 'lastName']
  		}]
  	}).then(data => {res.json(data)})
  	.catch(err => {res.json(err)});
  },
//Req.params has 2 parameters - option and value.  Filters for Active events
  findByOption: function(req, res){
 		const option = req.params.option;
 		const value = req.params.value;
  	db.event.findAll({
  		where:
				db.sequelize.where(db.sequelize.col(option), value),
  		include: [{
  			model: db.categories,
	      attributes: ['id', 'categoryName'],
  		}, {
  			model: db.matchOptions,
	      attributes: ['id', 'matchDescription'],
  		}, {
  			model: db.status,
  			attributes: ['id', 'statusName']
  		}, {
  			model: db.user,
  			attributes: ['id', 'firstName', 'lastName']
  		}]
  	}).then(data => {
  		let results = [];
  		data.forEach(event => {
  			if(event.isActive){
  				results.push(event);
  			}
  		});
  		res.json(results);
  	})
  	.catch(err => {res.json(err)}); 		 
  },
/* Updates Event - Request:
		eventName
		userId
		organizerAKA = can be NULL
		categoryId (from categories table - pre-sets)
		matchOptionId (from matchOptions table - pre-sets)
		aboutEvent = can be NULL
		signupDeadline = can be NULL
		shipDealine = can be NULL
		isPrivate
		statusName

	1 - Find statusId from statusName (should be pre-populated in status table)
	2 - Create new Event
*/
  update: function(req, res) {
    db.status.findOne({
    	where: {
    		statusName: req.body.statusName
    	}
    }).then(status => {
    	var request = req.body;
    	request.statusId = status.id;
    	db.event.update(request, {
    		where: {
    			id: req.params.id
    		}
    	})
    	.then(result => {
    		res.json(result)
    	}).catch(error => {res.json(err)});
    }).catch(err => {res.json(err)});    
  },
//De-activates an Event
  remove: function(req, res) {
  	db.event.update({
  		isActive: false
  	}, {
  		where: {
  			id: req.params.id
  		}
  	}).then(result => {res.json(result)})
  	.catch(err => {res.json(err)});
  }, 
//Add a User to an event - requires eventId and userId.  Will only allow user to join the same event once
  join: function(req, res){
  	db.eventAssociations.findOrCreate({
  		where: {
  			eventId: req.params.eventid,
  			userId: req.params.userid
  		},
  		defaults: {
	  		eventId: req.params.eventid,
	  		userId: req.params.userid,
	  		packageRecd: false
	  	}
  	}).spread((result, created) => {res.json(result)})
  	.catch(err => {res.json(err)});
  },
//Updates the eventAssociations table for trackingNumber and packageRecd
  eventAssociationUpdate: function(req, res){
		db.eventAssociations.update({
			trackingNumber: req.body.trackingNumber,
			packageRecd: req.body.packageRecd
		}, {
			where: {
				eventId: req.params.eventid,
				userId: req.params.userid
			}
		}).then(result => res.json(result))
		.catch(err => res.json(err));
  },
//Needs to throw error if the user has already been matched - res.status(400).json(json_response);
  eventAssociationLeave: function(req, res){
  	db.eventAssociations.findOne({
  		where: {
  			eventId: req.params.eventid,
  			userId: req.params.userid
  		}
  	}).then(event => {
  		if(event.matchedUserId){
  			let message = {
  				errorResponse: "You can't leave an event once you've been matched."
  			};
  			res.status(400).json(message);
  		} else {
  			db.eventAssociations.destroy({
  				where: {
		  			eventId: req.params.eventid,
		  			userId: req.params.userid  					
  				}
  			}).then(result => {res.json(result)})
  			.catch(error => {res.json(error)});
  		}
  	}).catch(err => {res.json(err)});
  },
//Runs the matching script for all participants in an event
  match: function(req, res){

  },
//Returns all Categories
  findAllCategories: function(req, res){

  },
//Returns all MatchOptions
  findAllMatchOptions: function(req, res){

  },

};