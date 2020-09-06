// the top level component responsible for showing the survey form and survey
//review, more importantly toggle between those two different forms
//surveynew shows surveyform and surveyreview
import React , {Component} from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import {reduxForm} from 'redux-form';
class SurveyNew extends Component {
  // make a component level state
  // constructor(props){
  //   super(props);
  //   this.state = {new : true};
  // }
  //a shortcut to initialize a new state
  state = {showReview : false};

  renderContent() {
    if(this.state.showReview){
      return <SurveyFormReview  onCancel = {() => this.setState({showReview : false})}/>;
    }
    return <SurveyForm
    // use a callback function to flip this value
            onSurveySubmit = { () => this.setState({showReview : true}) }
            />;
  }
  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

// target, when use hit cancel, we need to dump all the information that has been
//put into the form
//by default, if the form is unmounted, dump the form
//if we navigate away from the surveyNew, we dump the form, but if we just toggle
//between the surveyForm and surveyReview we preserve the form
export default reduxForm({
  form : 'surveyForm'
})(SurveyNew);
