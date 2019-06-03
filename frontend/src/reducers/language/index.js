/**
 * Created by Peter Hoang Nguyen on 3/17/2017.
 */

const languageState = {
  locale: 'en',
  languages: {},
  messages: {}
};

const LanguageState = (state = languageState, action) => {
  let newState = {};
  switch (action.type) {
    
    case 'SET_LOCALE':
      newState = {...state, locale: action.locale};
      break;
    case 'SET_LANGUAGE':
      // newState = languageState;
      let {languages} = state;
      let {language} = action;
      languages = {...languages, [language['language_id']]: language}
      newState = {...state, languages};
      break;
    case 'SET_MESSAGES':
      let {messages, locale} = action;
      const newMessages = {...state.messages, [locale]: messages}
      newState = {...state, locale: locale.toLowerCase(), messages: newMessages};
      break;
    default:
      return state;
    
  }
  return newState;
};
export default LanguageState;
