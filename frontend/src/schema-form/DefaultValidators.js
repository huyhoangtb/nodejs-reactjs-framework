import validator from 'validator';
import {t1} from 'i18n';

const passwordValidator = (value) => {
  if (!value) { // không nhập password thì ko validate
    return true;
  }
  // return value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
  return value.match(/^\S{3,58}$/);
}

const validateUserName = (value) => {
  if (!value) { // không nhập password thì ko validate
    return true;
  }
  return value.match(/^[a-zA-Z0-9\-\_]+$/);
}

export const executeValidatorFromConfig = (config, rule, value, callback) => {
  if (!value) {
    value = undefined;
  }
  if (config && config._method && value && !config._method(value)) {
    callback(config._message);
  }

  callback();
}

export const getConfigByField = (field) => {
  let result = null;

  DefaultValidatorsField.map(config => {
    if (!config._name) {
      return;
    }
    const _name = config._name;
    const fields = _name.split('|');
    fields.map((f) => {
      if (f.trim().toLowerCase() === field.trim().toLowerCase()) {
        result = config;
      }
    });
  });
  return result;
}

export const DefaultValidatorsField = [
  {
    _name: 'email',
    _method: validator.isEmail,
    _message: t1('incorrect email structure')
  },
  {
    _name: 'username',
    _method: validateUserName,
    _message: t1('username not correct')
  },
  {
    _name: 'password',
    _method: passwordValidator,
    _message: t1('password is not correct')
  },
  {
    _name: 'repassword|re-password',
    _method: passwordValidator,
    _message: t1('re-password is not correct')
  },
  // {
  //   _name: 'phone|tel',
  //   _method: validator.isMobilePhone,
  //   _message: t1('phone is not correct')
  // }
]