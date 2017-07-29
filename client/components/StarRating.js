import React from 'react';

const StarRating = (props) => {
  const stars = [];
  if (props.stars || props.stars === 0) {
    for (let i = 1; i <= 5; i += 1) {
      i <= props.stars ?
        stars.push(<span key={ i } className="glyphicon glyphicon-star" />) :
        stars.push(<span key={ i } className="glyphicon glyphicon-star-empty" />);
    }
  }
  return stars.length ?
    <span>{ stars } </span> :
  null;
};

export default StarRating;

/*
mixin starRating(stars)
  span.rating
  - for(let i = 1; i <= 5; i++)
    if i <= stars
      span.glyphicon.glyphicon-star
    else
      span.glyphicon.glyphicon-star-empty
 */
