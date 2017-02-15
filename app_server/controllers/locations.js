const homeList = function (req, res) {
  res.render('locations-list', { title: 'Home', wifiLocations });
};

const locationInfo = function (req, res) {
  res.render('location-info', { title: 'Location Info', location });
};

const addReview = function (req, res) {
  res.render('location-review-form', { title: 'Add a Review' });
};

export { homeList, locationInfo, addReview };
