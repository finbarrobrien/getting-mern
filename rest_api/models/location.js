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
		index : '2dsphere'
	},
	openingTimes : [ openingTimeSchema ],
	facilities : [ {
		type : String
	} ],
	reviews : [ reviewSchema ]
});

mongoose.model('location', locationSchema);
 
/*var location = {
		name: "Insomnia",
		stars: 5,
		latLng: [-0.9690884, 51.455041],
		address: "1 Main St, Dublin",
		openingTimes: [ {days: "Monday - Friday", open: "7:00am", close: "7:00pm", closed: false}, 
			{ days: "Saturday", open: "8:00am", close: "5:00pm", closed: false}, 
			{ days: "Sunday", closed: true}],
		facilities: ["Free Coffee", "Free Food", "Free Alcohol", "Free WiFi"],
		reviews : [
			{
				reviewer: "Finbarr O'Brien", 
				date: new Date("Nov 30,2016"), 
				stars: 5, 
				comment: "Love it."
			}, 
			{
				reviewer: "Aoife Feely", 
				date: new Date("Dec 1,2016"), 
				stars: 3, 
				comment: "It was okay. Coffee wasn't great, but the wifi was fast."
			}]	
	};*/