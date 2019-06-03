import React from "react";
import {connect} from 'react-redux';
import background from '../../../assets/images/hanoi.jpg';
import './stylesheet.css'


class ContactHeader extends React.Component {

  render() {
    return (
      <div className='ui-aster-home-banner'>
        <div className='ui-img-bg'>
          <img  src={background}/>
        </div>
      </div>
    );
  }
}

export default connect()(ContactHeader);

