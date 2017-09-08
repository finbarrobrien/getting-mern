import React from 'react';

const MapImage = ({ name, latitude, longitude, zoom, width, height }) => {
  const mapUrl = `http://maps.googleapis.com/maps/api/staticmap?key=AIzaSyC0MnlTnNRj8IA7n0vf922f96Js-KMPF5o&center=${latitude[1]},${longitude[0]}&zoom=${zoom}&size=${width}x${height}&sensor=false&markers=${latitude[1]},${longitude[0]}&scale=2`;

  return (
    <img
      alt={ `location map for ${name}` }
      className="img-responsive img-rounded"
      src={ mapUrl }
    />);
};

export default MapImage;
