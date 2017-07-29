import React from 'react';

const Facility = props =>
  <span className="label label-warning">
    <span className="glyphicon glyphicon-ok">&nbsp;{props.name}&nbsp;</span>
  </span>
;

export default Facility;

/*
mixin facility(facility)
  span.label.label-warning
    span.glyphicon.glyphicon-ok
    |&nbsp;
    =facility
  |&nbsp;
 */
