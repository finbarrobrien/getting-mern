import React from 'react';

const Panel = ({ title, children }) => {
  return (
    <div className="panel panel-primary">
      <div className="panel-heading">
        <h2 className="panel-title">{ title }</h2>
      </div>
      <div className="panel-body">
        { children }
      </div>
    </div>);
};

export default Panel;
