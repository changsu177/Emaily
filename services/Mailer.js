const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');


class Mailer extends helper.Mail {
  constructor({subject, recipients}, content) { // content is a string
    super();
    this.sgApi = sendgrid(keys.sendGridKey);
    //sendgrip speciifc setup
    //email,content are from sendgrip func to format
    this.from_email = new helper.Email( "su.chan@northeastern.edu");
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);
    // the addContent func is from helper.Mail
    this.addContent(this.body);
    // scans the emails, replaces every link with their own special one

    this.addClickTracking();
    this.addRecipients();

  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }


  addRecipients() {
     const personalize = new helper.Personalization();
     this.recipients.forEach(recipient => {
       personalize.addTo(recipient);
     });
     this.addPersonalization(personalize);
   }
  // take this mailer and send it to the sendgrip
  async send(){
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      //MAIL -based class
      body: this.toJSON()
    });

    const response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;