/**
 * Model for the 'location' object and it's sub models 'review' and 'openingTime'
 */

var mongoose = require('mongoose');

var openingTimeSchema = new mongoose.Schema({
	days : {
		type : String
	},
	open : {
		type : String
	},
	close : {
		type : String
	},
	closed : {
		type : Boolean,
		"default" : false
	}
});

var reviewSchema = new mongoose.Schema({
	reviewer : {
		type : String,
		required : true
	},
	date : {
		type : Date,
		"default" : Date.now
	},
	stars : {
		type : Number,
		"default" : 0,
		min : 0,
		max : 5
	},
	comment : {
		type : String
	}
});

var locationSchema = new mongoose.Schema({
	name : {
		type : String,
		required : true
	},
	address : {
		type : String,
		required : true
	},
	stars : {
		type : Number,
		"default" : 0,
		min : 0,
		max : 5
	},
	latLng : {
		type : [ Number ],
		index : '2dsphere',
		required: true
	},
	openingTimes : [ openingTimeSchema ],
	facilities : [ {
		type : String
	} ],
	reviews : [ reviewSchema ]
});

mongoose.model('Location', locationSchema);
