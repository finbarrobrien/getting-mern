import React from 'react';
import StarRating from './StarRating';
import moment from 'moment';

const Review = ({ review }) => {
  const { reviewer, stars, date, comment } = review;
  return (
    <div className="row">
      <div className="review">
        <div className="well well-sm review-header">
          <StarRating stars={ stars } />
          <span className="reviewAuthor">&nbsp;&#8226;&nbsp;{ reviewer }&nbsp;&#8226;&nbsp;</span>
          <small className="reviewTimestamp">
            { moment(date).format('DD MMM YYYY') }
          </small>
        </div>
        <div className="col-xs-12">
          <p>{ comment }</p>
        </div>
      </div>
    </div>
  );
};

export default Review;
/*
div.row
    div.review
      div.well.well-sm.review-header
        +starRating(review.stars)
        span.reviewAuthor=review.reviewer
        small.reviewTimestamp
          +formatDate(review.date)
      div.col-xs-12
        p=review.comment
 */
