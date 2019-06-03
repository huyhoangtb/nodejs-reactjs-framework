import React from "react";
import {connect} from 'react-redux';
import MenuPanel from '../../components/menu-panel';
import Services from '../../components/services';
import ClientFeedback from '../../components/client-feedback';
import ContactUs from '../../components/contact-us';
import OurTechnology from '../../components/our-technology';
import background from 'themes/aster/assets/images/homepage1.jpg';
import OurGoal from '../../components/our-goal';
import './stylesheet.css'
import ImageBackGround from "components/common/viewers/image-background";

class AsterLayout extends React.Component {

  render() {
    return (
      <div className='ui-home-page'>
        <div className='ui-home-banner'>
          <ImageBackGround src={background} height={500}>
            <MenuPanel/>
            <div className='home-ads'>
              <h1 className='title'>
                VIETNAM OUTSOURCING COMPANY
              </h1>
              <ul className='outline'>
                <li>
                  Our location base on Hanoi - Vietnam
                </li>
                <li>
                  We are working hard and play hard
                </li>
              </ul>
            </div>

          </ImageBackGround>
        </div>
        < OurTechnology/>
        < Services/>

        < OurGoal/>
        < ClientFeedback/>
        < ContactUs/>
      </div>
    );
  }
}

export default connect()(AsterLayout);

