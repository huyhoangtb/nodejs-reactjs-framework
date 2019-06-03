export const validatePasswordValues = (values) => {
  let errors = {};
  errors = {...errors, ...validatePassword(values.password, 'password')};
  errors = {...errors, ...validatePassword(values.repassword, 'repassword')};
  
  if (values.password && values.repassword && values.password !== values.repassword) {
    errors.repassword = 'Sorry, your repassword not matched'
  }
  return errors;
}

export const validatePasswordValuesInCaseChange = (values) => {
  let errors = {};
  errors = {...errors, ...validatePassword(values.oldPassword, 'oldPassword')};
  errors = {...errors, ...validatePasswordValues(values)};
  
  if (values.password && values.repassword && values.password !== values.repassword) {
    errors.repassword = 'Sorry, your new password and retype new password not matched';
  }
  return errors;
}

export const validatePassword = (password, fieldName) => {
  const errors = {};
  if (!fieldName) {
    fieldName = 'password';
  }
  
  if (!password) {
    errors[fieldName] = `${fieldName} is Required`
  } else if (password.length < 6) {
    errors[fieldName] = `Sorry, ${fieldName} must be at least 6 characters`
  }
  
  return errors;
}

export default validatePassword;
