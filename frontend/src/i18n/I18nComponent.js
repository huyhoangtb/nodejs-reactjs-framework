import React from 'react';
import DefaultLanguage from './DefaultLanugage';
import {connect} from 'react-redux';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 23/06/2017
 **/
class I18nAsync extends React.Component {
  getLanguagePresent = () => {
    const {userInfo} = this.props;
    return userInfo['language'] || {language_id: 10, language_iso_code: 'en'};
  }
  getMessagesAtClientSite = (languageCode) => {
    return {};
    
    const {userInfo, siteLanguage} = this.props;
    let messages = siteLanguage['messages'];
    if (!messages || (messages && Object.keys(messages).length === 0)) {
      let stLanguage = localStorage.getItem('reduxPersist:siteLanguage');
      if (stLanguage) {
        stLanguage = JSON.parse(stLanguage);
      }
      if (stLanguage) {
        messages = stLanguage['messages'];
      }
    }
    
    if (!messages || !messages[languageCode]) {
      return {};
    }
    return messages[languageCode];
  }
  
  constructor() {
    super();
    this.state = {
      messages: {en: DefaultLanguage, language: {}},
    };
  }
  
  render() {
    const {children, siteLanguage} = this.props;
    let {locale, messages} = siteLanguage;
    if (!messages[locale]) {
      messages = DefaultLanguage;
      locale = 'vi';
    }
    return (
      <div>
        {children}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: {},
  siteLanguage: state.siteLanguage
});
export default connect(mapStateToProps)(I18nAsync);

