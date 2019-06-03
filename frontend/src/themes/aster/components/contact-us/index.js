import React from "react";
import {Icon} from 'antd';
import {connect} from 'react-redux';
import './stylesheet.css'
import ContactFormSchema from './ContactFormSchema';
import {t1} from "i18n";
import uuid from "uuid/v4";
import FormGeneration from "schema-form/GenerateForm";

class AsterLayout extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {history} = this.props;
    return (
      <div className="ui-contact-us">
        <div className='ui-contact-us-content'>
          <div className='ui-contact-info'>
            <div>
              <span className='step-number'>01/</span>
              <span className='step-name'> Get in touch </span>
            </div>
            <div>
              <p className='message'>
                we're very approachable and wold love to speak to you. feel free to call , send us an email, tweet us or
                simply complete the enquiry form
              </p>
              <ul className='contact-info'>
                <li>
                  <Icon theme="filled" type="phone"/>
                  <span>(+84)966 298 666</span>
                </li>
                <li>
                  <Icon theme="filled" type="mail"/>
                  <span>vntopmas@gmail.com</span>
                </li>
                <li>
                  <Icon type="twitter"/>
                  <span>@huyhoangtb</span>
                </li>
                <li>
                  <Icon theme="filled" type="facebook"/>
                  <span>@peterhoangnguyen</span>
                </li>
                <li>
                  <Icon theme="filled" type="skype"/>
                  <span>@peterhoangnguyen</span>
                </li>
              </ul>
            </div>
          </div>
          <div className='ui-send-message'>
            <div>
              <span className='step-number'>02/</span>
              <span className='step-name'> Send us a message </span>
            </div>
            <FormGeneration
              node='contact'
              onSuccess={(org) => {
                if (org.iid) {
                  history.push(`/admin/organization/${org.iid}`);
                }
              }}
              nodeAction='create'
              submitLabel={t1('send message')}
              formId={uuid()}
              schema={ContactFormSchema}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(AsterLayout);

