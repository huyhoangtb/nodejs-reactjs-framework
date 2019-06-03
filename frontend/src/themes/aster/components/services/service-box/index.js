import React from "react";
import './stylesheet.css'

class ServicesBox extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {icon, className} = this.props;
    return (
      <div className={`ui-service-box ${className}`}>
        <div className='ui-service-box-level1'>
          <div className='ui-service-content'>
            <div>
              <img src={icon}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ServicesBox;

