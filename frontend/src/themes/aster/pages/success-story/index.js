import React from "react";
import ContactUsComponent from '../../components/contact-us';
import './stylesheet.css'
import ClientFeedback from "../../components/client-feedback";
import SubPageHeader from "../../components/sub-page-header";
import {t1} from 'i18n';
import OurTechnology from "../../components/our-technology";
import outsourcingBd from "../../assets/images/outsourcing.jpg";
import WhyOutsource from "../../assets/images/Why-Outsource.png";
import {Icon} from "antd";

class SuccessStory extends React.Component {

  render() {
    return (
      <div className='ui-success-story'>
        <SubPageHeader imgUrl={outsourcingBd} title={t1('Success story')}/>
        <div className='ui-news-content'>
          <h2>~ Success story ~</h2>
          <p className='desc'>
            We have a very good R&D team.
          </p>
          <p className='desc last'>
            You can very surprised with the app performance and concurrent users.
          </p>
          <div className='ui-content'>
            <div className='text-center'>
              <img src={WhyOutsource}/>
            </div>

            <p>
              Aster Software offers top quality software outsourcing services to clients worldwide, we're
              located in the heart of Hanoi City, Vietnam which is considered as one of the big tech innovation hub
              of SEA.
            </p>
            <p>
              With a passion for excellence, we deliver high-quality software outsourcing services with exceptional
              skills, talents and a proven approach. We are also a trusted software outsourcing company with
              well-established global capabilities, quality standards and delivery processes that guarantee business
              values.
            </p>
            <p>
              We believe that the key factors to successful software outsourcing services are a talented team and
              efficient processes. High quality deliverable is the output from the combination of a great team following
              equally great processes. We have a team of 110 software engineers who are experts in modern web and mobile
              apps development technologies. All of them have the fluent English communication skills for smooth
              collaboration with overseas customers.
            </p>

            <ul className='outline'>
              <li>
                <Icon type='minus'/>
                <p>
                  Aster Software We have an offshore software dedicated team, fixed price/outcome based, hourly rate
                  models
                  as well as a Build-Operate-Transfer (BOT) model.
                </p>
              </li>
              <li>
                <Icon type='minus'/>
                <p>
                  Aster Software believes that, with our experience in software outsourcing services and the top
                  software
                  development teams and well-practiced Agile process, we can deliver the application you are looking
                  for.
                </p>
              </li>
              <li>
                <Icon type='minus'/>
                <p>
                  Some of our customers are big brands in their respective industries: Standard Chartered Bank
                  International, DMI Global, Novaland Group in Vietnam are just a few of them.
                </p>

              </li>
            </ul>
          </div>
        </div>
        <OurTechnology/>
        <ClientFeedback/>
        <ContactUsComponent/>

      </div>
    );
  }
}

export default SuccessStory;

