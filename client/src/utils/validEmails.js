//regular expression from emailregex
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails) => {
  const invalidEmails = emails
  .split(',')
  .map(email => email.trim())
  .filter( email => email.length > 0 && re.test(email) === false); // if the email is invalid, it will be dumped out of the
//array . if the email is invalid, this statement will return false
  if( invalidEmails.length ){
    return `These emails are invaid: ${ invalidEmails }`;
  };
};
