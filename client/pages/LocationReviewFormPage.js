import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SPAPage from '../components/SPAPage';

class LocationReviewFormPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reviewer: '',
      stars: 0,
      comment: '',
      error: null,
      submitted: false,
      cancelled: false,
    };
  }


  postApiData = () => {
    let requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");
    fetch(`http://localhost:3000/api/location/${this.props.location.state.locationId}/reviews`, {
      mode: 'no-cors',
      method: 'post',
      headers: requestHeaders,
      body: JSON.stringify(this.state)
    }).then((resp) => {
      if (resp.ok) {
        this.setState({ submitted: true});
      }
      return {
        errorCode: resp.status,
        errorMessage: resp.statusText,
      };
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    if (this.state.submitted || this.state.cancelled) {
      return (
      <Redirect to={{
        pathname: `/location/${this.props.location.state.locationId}`
      }} />
      );
    }
    console.log(this.props);
    return (
      <SPAPage bannerTitle={ `Review for ${this.props.location.state.name}` }>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-6">
              <form className="form form-horizontal">
                <div className="form-group">
                  <label
                    className="col-xs-10 col-sm-2 control-label"
                    htmlFor="reviewer">Name</label>
                  <div className="col-xs-12 col-sm-10">
                    <input id="reviewer" className="form-control" value={this.state.reviewer} onChange={ (event) => { this.setState({ reviewer: event.target.value }) }} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-xs-10 col-sm-2 control-label" htmlFor="stars">Rating</label>
                  <div className="col-xs-12 col-sm-2">
                    <select id="stars" className="stars.form-control.input-sm" value={this.state.stars}  onChange={ (event) => { this.setState({ stars: event.target.value }) }}>
                      <option>5</option>
                      <option>4</option>
                      <option>3</option>
                      <option>2</option>
                      <option>1</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label
                    className="col-xs-10 col-sm-2 control-label"
                    htmlFor="comment">Review</label>
                  <div className="col-sm-10">
                    <textarea id="comment" className="form-control" rows="5" value={this.state.comment}  onChange={ (event) => { this.setState({ comment: event.target.value }) }} />
                  </div>
                </div>
                <button className="btn btn-primary pull-right" onClick={ this.postApiData }>Add my review</button>
                <button className="btn btn-default pull-right" onClick={ () => { this.setState({ cancelled: true }) } }>Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </SPAPage>
    );
  }

}

export default LocationReviewFormPage;
