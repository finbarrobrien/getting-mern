import React from 'react';
import { Glyphicon } from 'react-bootstrap';

const StarRating = ({ stars }) => {
  const s = [];
  if (stars || stars === 0) {
    for (let i = 1; i <= 5; i += 1) {
      i <= stars ?
        s.push(<Glyphicon key={ i } glyph="star" />) :
        s.push(<Glyphicon key={ i } glyph="star-empty" />);
    }
  }
  return s.length ?
    <span>{ s } </span> :
  null;
};

export default StarRating;
