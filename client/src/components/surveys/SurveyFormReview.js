// shows users their form inputs for review
import React from 'react';
import {connect} from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';
import * as actions from '../../actions';
import {withRouter} from 'react-router';
// don't forget to receive functions (preserved in props) as parameters\
// or we could put props as parameter and call props.submitSurvey
const SurveyReview = ( { onCancel, formValues, submitSurvey, history} ) => {
  const reviewFields = _.map(formFields, field => {
    return (
      <div key = {field.name}>
        <label> {field.label}</ label>
        <div>
          {formValues[field.name]}
        </div>
      </div>
    );
  });

  // to delay the execution of a callback function with input parameter . use a
  // arrow functino. onClick = {() => submitSurvey(formValues)}
  // or could be just put without ()  onClick = {submitSurvey}
  //navigate to the homepage when surveys are sent out. link component is not
  //appropriate here cuz link is a click-based navigation, we need to click the
  // button. But here we need the page automatically jump to the dashboard
  return (
    <div>
      <h5> please confirm your entries.</h5>
      {reviewFields}
      <button className = "yellow darken-3 btn-flat white-text" onClick = { onCancel} >
      Back
      </button>
      <button
        onClick = {() => submitSurvey(formValues, history)}
        className = "green darken-3 btn-flat right white-text">
        Send Survey
        <i className = "material-icons right"> email </i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {

  return {
    formValues : state.form.surveyForm.values

  };
}

// teach some arbitrary components how to use react router and navigate around
// mainly make use of history , pass it to the action creator , so that it can
// do some navigation after the request has been made .  similar to connect
// SurveyReview now know the history object that is provided by the react router .
// and the history object is passed on to the props object. so the SurveyReview
//could receive it as a parameter
export default connect(mapStateToProps, actions)(withRouter(SurveyReview)) ;
