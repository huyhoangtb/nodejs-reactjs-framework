import React from "react";
import ContactUsComponent from '../../components/contact-us';
import OurGoal from '../../components/our-goal';
import './stylesheet.css'
import Services from "../../components/services";
import ClientFeedback from "../../components/client-feedback";
import SubPageHeader from "../../components/sub-page-header";
import {t1} from 'i18n';
import OurTechnology from "../../components/our-technology";
import background from "../../assets/images/contactus.jpg";

class ContactUs extends React.Component {

  render() {
    return (
      <div className='ui-contactus-page'>
        <SubPageHeader imgUrl={background} title={t1('contact us')}/>
        <ContactUsComponent/>
        <Services/>
        <OurGoal/>
        <OurTechnology/>
        <ClientFeedback/>
      </div>
    );
  }
}

export default ContactUs;

