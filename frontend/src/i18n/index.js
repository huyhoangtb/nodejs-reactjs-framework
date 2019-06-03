export const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('').toLowerCase();

// This is the function.
String.prototype.format = function (args) {
  var str = this;
  return str.replace(String.prototype.format.regex, function (item) {
    var intVal = parseInt(item.substring(1, item.length - 1));
    var replace;
    if (intVal >= 0) {
      replace = args[intVal];
    } else if (intVal === -1) {
      replace = "{";
    } else if (intVal === -2) {
      replace = "}";
    } else {
      replace = "";
    }
    return replace;
  });
};

String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");

export const capitalizeString = (message) => {
  if (!message || message.length <= 0) {
    return message;
  }
  let result = message[0].toUpperCase();
  for (let i = 1; i < message.length; i += 1) {
    if (message[i - 1] === ' ' && message[i] !== ' ') {
      result += message[i].toUpperCase();
    } else if (message[i - 1] !== ' ' && message[i] !== ' ') {
      result += message[i].toLowerCase();
    } else if (message[i - 1] !== ' ' && message[i] === ' ') {
      result += message[i];
    }
  }
  return result;
};

class I18nUtils {
  MESSAGES_NORMAL = 0;
  MESSAGES_UPPERCASE = 1;
  MESSAGES_LOWERCASE = 2;
  MESSAGES_UPPERCASE_FIRST_CHAR = 3;
  MESSAGES_UPPERCASE_FIRST_CHAR_OF_WORD = 4;
  
  formatMessage(key, params, type) {
    if (!key) {
      throw new Error('key of setMessage not found');
    }
    const messageType = type || this.MESSAGES_NORMAL;
    let message = key;
    if (message && !message.hasOwnProperty(key)) {
      // this.processMissingKey(intl.locale, key);
      message = message.replace(/_/g, ' ');
    }
    
    if (params) {
      if (Array.isArray(params)) {
        message = message.format(params);
      } else {
        message = message.format([params]);
      }
    }
    
    switch (messageType) {
      case this.MESSAGES_NORMAL:
        break;
      case this.MESSAGES_LOWERCASE:
        message = message.toLowerCase();
        break;
      case this.MESSAGES_UPPERCASE:
        message = message.toUpperCase();
        break;
      case this.MESSAGES_UPPERCASE_FIRST_CHAR:
        message = capitalize(message);
        break;
      case this.MESSAGES_UPPERCASE_FIRST_CHAR_OF_WORD:
        message = capitalizeString(message);
        break;
      default:
        break;
    }
    
    return message;
  }
  
  processMissingKey() {
  }
}

const i18nUtils = new I18nUtils();

export const t =
  (key, params, type) => i18nUtils.formatMessage(key, params, type);

export const t1 =
  (key, params) =>
    i18nUtils.formatMessage(key, params, i18nUtils.MESSAGES_UPPERCASE_FIRST_CHAR);

export const t2 =
  (key, params) =>
    i18nUtils.formatMessage(key, params, i18nUtils.MESSAGES_UPPERCASE_FIRST_CHAR_OF_WORD);

export const t3 =
  (key, params) =>
    i18nUtils.formatMessage(key, params, i18nUtils.MESSAGES_UPPERCASE);

export const t4 =
  (key, params) =>
    i18nUtils.formatMessage(key, params, i18nUtils.MESSAGES_LOWERCASE);

export default {
  t, t1, t2, t3, t4
};
