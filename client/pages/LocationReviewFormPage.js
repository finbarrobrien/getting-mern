import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SPAPage from '../components/SPAPage';

/**
 * todo - debounce input changes
 *      - fix post/redirect
 *      - simplify JSX
 *      - add error redirects
 *      - fix space between buttons
 *      - cancel should go back in history
 */
export default class LocationReviewFormPage extends Component {

  constructor(props) {
    super(props);
    this.review = {
      reviewer: '',
      stars: 0,
      comment: '',
    };
    this.state = {
      error: null,
      submitted: false,
      cancelled: false,
    };
  }

  // todo add validation of review fields
  postApiData = () => {
    let requestHeaders = new Headers();
    console.log(JSON.stringify(this.review));
    fetch(`http://localhost:3000/api/location/${this.props.location.state.locationId}/reviews`, {
      mode: 'cors', // of course, since it's coming from the browser...
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(this.review)
    }).then((resp) => {
      console.log(resp);
      if (resp.ok) {
        this.props.history.goBack();
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
    console.log(this.props);
    return (
      <SPAPage bannerTitle={ `Review for ${this.props.location.state.name}` }>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-6">
              <div className="form form-horizontal">
                <div className="form-group">
                  <label
                    className="col-xs-10 col-sm-2 control-label"
                    htmlFor="reviewer">Name</label>
                  <div className="col-xs-12 col-sm-10">
                    <input
                      id="reviewer"
                      className="form-control"
                      value={this.state.reviewer}
                      onChange={ (event) => { this.review.reviewer = event.target.value; }} />
                  </div>
                </div>
                <div className="form-group">
                  <label
                    className="col-xs-10 col-sm-2 control-label"
                    htmlFor="stars">Rating</label>
                  <div className="col-xs-12 col-sm-2">
                    <select
                      id="stars"
                      className="stars.form-control.input-sm"
                      value={this.state.stars}
                      onChange={ (event) => { this.review.stars = event.target.value; }}>
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
                    <textarea
                      id="comment"
                      className="form-control"
                      rows="5"
                      value={ this.state.comment }
                      onChange={ (event) => { this.review.comment = event.target.value; } }/>
                  </div>
                </div>
                <button
                  className="btn btn-primary pull-right"
                  style={ { marginLeft: '5px', marginRight: '5px' } }
                  onClick={ this.postApiData }>Add my review</button>
                <button
                  className="btn btn-default pull-right"
                  style={ { marginLeft: '5px', marginRight: '5px' } }
                  onClick={ () => { this.props.history.goBack(); } }>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </SPAPage>
    );
  }

}
