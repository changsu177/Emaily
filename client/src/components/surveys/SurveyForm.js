
//reduxForm helps redux-form to communicate with the redux store.
// similar to the connect function from react-redux
//Field can render all traditional html form elements
import React , {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import _ from 'lodash'; // use map func in it
import {Link} from 'react-router-dom';
import validateEmails from '../../utils/validEmails'
import formFields from './formFields';

// the input tet will be stored under the key of "surveyTitle"
class SurveyForm extends Component {
  renderFields() {
    // eveything defined in the filed will be forwarded into the SurveyField
    return _.map(formFields, ({label, name}) => {
      return (
        <Field key = {name} component = {SurveyField} type = "text" label = {label} name = {name}
        />
      );
    });
  };
// call this.props.onSurveySubmit only when the user has submitted the form
// rather than the time when js evaluates this statement
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
        >
        {this.renderFields()}
        <Link to = "/surveys" className = "red btn-flat wihit-text" >
          cancel
        </Link>
          <button type = 'submit' className = "teal btn-flat right wihit-text">
            Next
            <i className = "material-icons right"> done </i>
          </ button>
        </form>
      </div>
    );
  }
}

// values is the same as the form to be submitted
function validate(values) {
  const errors = {};
  // iterate throught the formFields array and retrive only the name property out of
  // FIELDS
    errors.recipients = validateEmails(values.recipients || '');
  _.each(formFields, ( {name} ) => {
    //js101 referance a property on an object on the fly
    // not value.name
    if( ! values[name] ){
      errors[name] = 'Please enter a value.'
    }
    // for the Recipients, we need each email address to be seperated by ', '
    // if any of the input email is invalid, we should let our users know
    // exaclly which one is invalid

  });
  // if the error is null, then the form is valid
  //otherwise the reduxform will notice that something is wrong
  return errors;
}
// diff: it takes only one single argument that contains
// a couple of different options that we will use to customize
//how our form behaves
// handleSubmit is one of the props that reduxForm is adding to the SurveyForm
//validate automatically run every time the user submit the form
export default reduxForm({
  validate: validate,
  form : 'surveyForm',
  //by default, this value is true, which means any time the survey is unmounted
  // or no longer shown on the screen, the redux form will kill the form we are
  //working on
  destroyOnUnmount: false
})(SurveyForm);
