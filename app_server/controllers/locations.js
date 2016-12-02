module.exports.homeList = function(req, res){
	var wifiLocations = [{
		name: "Starcup",
		stars: 3,
		proximity: "100m",
		address: "2 Main St, Dublin",
		facilities: ["Coffee", "Food", "Alcohol", "Free WiFi"]
	},
	{
		name: "Insomnia",
		stars: 5,
		proximity: "10m",
		address: "1 Main St, Dublin",
		facilities: ["Free Coffee", "Free Food", "Free Alcohol", "Free WiFi"]
	}];
	res.render('locations-list', { title: 'Home', wifiLocations });
};

module.exports.locationInfo = function(req, res){
	var location = {
		name: "Insomnia",
		stars: 5,
		proximity: "10m",
		address: "1 Main St, Dublin",
		openingTimes: ["Monday - Friday : 7:00am - 7:00pm", "Saturday : 8:00am - 5:00pm", "Sunday : closed"],
		facilities: ["Free Coffee", "Free Food", "Free Alcohol", "Free WiFi"],
		mapURL: "http://maps.googleapis.com/maps/api/staticmap?center=51.455041,-0.9690884&zoom=17&size=400x350&sensor=false&markers=51.455041,-0.9690884&scale=2",
		reviews : [
			{
				reviewer: "Finbarr O'Brien", 
				date: "16 June 2016", 
				stars: 5, 
				comment: "Love it."
			}, 
			{
				reviewer: "Charlie Chaplin", 
				date: "16 June 2016", 
				stars: 3, 
				comment: "It was okay. Coffee wasn't great, but the wifi was fast."
			}]	
	};
	res.render('location-info', { title: 'Location Info', location });
};

module.exports.addReview = function(req, res){
	res.render('location-review-form', { title: 'Add a Review' });
};