import React, { Component } from 'react';

class SPAPage extends Component {

  render() {
    return (
      <block className="content" >
        <h1>{ this.props.title }</h1>
        <p>{ `Welcome to ${title}` }</p>
      </block>
    );
  }

}

export default SPAPage;
