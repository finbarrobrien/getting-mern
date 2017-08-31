import React from 'react';

const Facility = ({ name }) => {
  return (
    <span className="label label-warning" style={{marginLeft: '5px', marginRight: '5px'}}>
      <span className="glyphicon glyphicon-ok">&nbsp;{name}&nbsp;</span>
    </span>);
};

export default Facility;

/*
mixin facility(facility)
  span.label.label-warning
    span.glyphicon.glyphicon-ok
    |&nbsp;
    =facility
  |&nbsp;
 */
