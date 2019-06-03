import React from "react";
import './stylesheet.css'

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 27/05/2017
 **/
class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
      <div className='ui-default-layout'>
        {this.props.children}
      </div>
    );
  }
}

export default index;
