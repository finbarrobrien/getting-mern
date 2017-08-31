import React from 'react';

const StarRating = ({ stars }) => {
  const s = [];
  if (stars || stars === 0) {
    for (let i = 1; i <= 5; i += 1) {
      i <= stars ?
        s.push(<span key={i} className="glyphicon glyphicon-star" />) :
        s.push(<span key={i} className="glyphicon glyphicon-star-empty" />);
    }
  }
  return s.length ?
    <span>{ s } </span> :
  null;
};

export default StarRating;
